# Open: src/todos/service.py

# Live local array tracking inside your existing layer
MOCK_DATA = [
    {
        "id": "CNT-2025-001",
        "title": "Microsoft Azure Enterprise Agreement",
        "vendor": "Microsoft Corp",
        "type": "Cloud Services",
        "value": "$2.40M",
        "endDate": "2026-01-14",
        "owner": "Sarah Chen",
        "status": "Active",
        "compliance": "high"
    }
]

class TodoService:
    @staticmethod
    def get_all(search: str = None, status: str = None):
        results = MOCK_DATA
        if status and status != "All":
            results = [item for item in results if item["status"] == status]
        if search:
            results = [
                item for item in results 
                if search.lower() in item["title"].lower() or search.lower() in item["vendor"].lower()
            ]
        return results

    @staticmethod
    def create(data: dict):
        new_id = f"CNT-2025-{str(len(MOCK_DATA) + 1).zfill(3)}"
        data["id"] = new_id
        MOCK_DATA.append(data)
        return data