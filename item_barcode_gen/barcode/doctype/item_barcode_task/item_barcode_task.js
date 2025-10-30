// Copyright (c) 2025, yuga and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Item Barcode Task", {
// 	refresh(frm) {

// 	},
// });
// frappe.ui.form.on("Item", {
//     refresh(frm) {
//         frm.add_custom_button("Regenerate Barcode", () => {
//             frappe.call({
//                 method: "item_barcode_gen.api.generate_item_barcode",
//                 args: { doc: frm.doc },
//                 callback: function(r) {
//                     frappe.msgprint("Barcode regenerated successfully.");
//                     frm.reload_doc();
//                 }
//             });
//         });
//     }
// });
