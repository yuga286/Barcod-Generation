frappe.ui.form.on("Item", {
    refresh(frm) {
        frm.add_custom_button("Regenerate Barcode", () => {
            frappe.call({
                method: "item_barcode_gen.api.regenerate_barcode_api",
                args: { item_name: frm.doc.name },
                callback() {
                    frappe.msgprint("Barcode regenerated successfully");
                    frm.reload_doc();
                }
            });
        });
    }
});

