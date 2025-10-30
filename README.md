Item Barcode Generator — Frappe / ERPNext App

This custom Frappe app automatically generates and assigns a unique barcode to each Item created in ERPNext.
It follows the required format:

<ITEM_ABBR>-<YYYYMMDD>-<NNN>


Example: BOL-20251029-001

🎯 Features

Auto-generates barcode on Item creation

Stores barcode in Item Barcode DocType

Supports multiple items per day with counter logic

Handles short item names (pads with _)

Button to manually regenerate barcode

API endpoint to fetch latest barcode for an item

🧠 Barcode Logic
Part	Source	Example
ITEM_ABBR	First 3 uppercase letters of item name (padded with _)	AB → AB_
Date	Creation date	20251029
Counter	Incremental for same date & prefix	001, 002, ...
📦 Installation
# Get ERPNext Bench environment ready
bench get-app https://github.com/<your_repo_link>/item_barcode_gen.git
bench --site <site-name> install-app item_barcode_gen
bench migrate
bench restart

🧪 How to Test
✅ 1. Create Item

Create new Item named Bolt

Expected barcode: BOL-YYYYMMDD-001

Create second item same day:

Expected barcode: BOL-YYYYMMDD-002

Create item AB

Expected barcode: AB_-YYYYMMDD-001

✅ 2. Click “Regenerate Barcode”

Should create new barcode entry

Updates latest barcode value

✅ 3. API Test

Endpoint:

/api/method/item_barcode_gen.api.get_item_barcode?item_code=<ITEM CODE>


Response:

{
 "item_code": "BOLT-0001",
 "barcode": "BOL-20251029-003",
 "barcode_type": "EAN13",
 "uom": "Nos"
}

🏗 Design Choices

Used validate hook to ensure barcode assignment happens before save

Counter stored & incremented using DB query to avoid race issues

Used standard Item Barcode Doctype instead of creating a new one (best practice)

Added explicit server method for regeneration (follows Frappe UX conventions)

Separate API endpoint for modular access

⚠️ Assumptions / Limitations

ERPNext’s Item Barcode DocType must exist (present in standard ERPNext install)

UOM default assumed Nos — can be customized

No concurrency lock implemented (but logic avoids duplicate counters in 99% cases)

📁 Folder Structure
item_barcode_gen/
 ┣─ item_barcode_gen/
 ┃  ┣─ hooks.py
 ┃  ┣─ api.py
 ┃  ┣─ public/
 ┃     ┗─ item.py (override, validate logic)
 ┣─ README.md
 ┣─ setup.py

🚀 Command Cheatsheet
Task	Command
Install app	bench install-app item_barcode_gen
Run bench	bench start
Migrate	bench migrate


<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/dc70a5a6-abfa-4a56-aee8-99c873228c16" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/4a9f18e8-e39c-48c8-b805-8f4f604c7f46" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/ec31d1df-e5f8-4683-aa8a-ea43f87bfc61" />
