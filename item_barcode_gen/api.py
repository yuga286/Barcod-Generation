import frappe
from frappe.utils import nowdate

@frappe.whitelist()
def regenerate_barcode_api(item_name):
    doc = frappe.get_doc("Item", item_name)
    return _generate_barcode(doc)

def _generate_barcode(doc, method=None):
    abbr = (doc.item_name[:3].upper() 
            if len(doc.item_name) >= 3 
            else doc.item_name.upper().ljust(3, "_"))

    today = nowdate().replace("-", "")
    count = frappe.db.count("Item Barcode", {
        "barcode": ["like", f"{abbr}-{today}-%"]
    }) + 1

    barcode = f"{abbr}-{today}-{count:03d}"

    # clear old
    doc.barcodes = []

    doc.append("barcodes", {
        "barcode": barcode,
        "barcode_type": "Custom",
        "uom": doc.stock_uom,
    })

    doc.save()
    frappe.msgprint(f"Barcode: {barcode}")

    return barcode
