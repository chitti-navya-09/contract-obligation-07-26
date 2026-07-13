from src.entities.contract import Contract

contracts = [
    Contract(
        id="CTR-001",
        company="Microsoft",
        contract="Azure Enterprise Agreement",
        category="Cloud Service",
        value="$2.4M",
        owner="Sarah Chen",
        status="Active",
        compliance=96,
        renewal="23 Jul 2026",

        start_date="01 Jan 2026",
        end_date="31 Dec 2026",
        days_remaining=175,
        priority="High",
        description="Enterprise Azure cloud services agreement.",

        paid_amount="$1.2M",
        outstanding="$1.2M",
        currency="USD",
        payment_progress=50,

        renewal_type="Automatic",
        notice_period="60 Days",
        auto_renewal="Enabled",

        created_on="15 May 2025",
        effective_date="01 Jan 2026",
        expiry_date="31 Dec 2026",
        renewal_reminder="01 Nov 2026",

        documents=8,
        obligations=12,
        tasks=5,
    ),

    Contract(
        id="CTR-002",
        company="Amazon AWS",
        contract="AWS Production Infrastructure",
        category="Infrastructure",
        value="$650K",
        owner="David Lee",
        status="Review",
        compliance=74,
        renewal="10 Aug 2026",

        start_date="15 Feb 2026",
        end_date="15 Feb 2027",
        days_remaining=210,
        priority="Medium",
        description="AWS production infrastructure agreement.",

        paid_amount="$325K",
        outstanding="$325K",
        currency="USD",
        payment_progress=50,

        renewal_type="Manual",
        notice_period="30 Days",
        auto_renewal="Disabled",

        created_on="10 Feb 2026",
        effective_date="15 Feb 2026",
        expiry_date="15 Feb 2027",
        renewal_reminder="15 Jan 2027",

        documents=6,
        obligations=9,
        tasks=3,
    ),

    Contract(
        id="CTR-003",
        company="Salesforce",
        contract="CRM Enterprise License",
        category="Software",
        value="$310K",
        owner="John Smith",
        status="Draft",
        compliance=48,
        renewal="02 Dec 2026",

        start_date="01 Mar 2026",
        end_date="01 Mar 2027",
        days_remaining=230,
        priority="Low",
        description="CRM licensing agreement.",

        paid_amount="$100K",
        outstanding="$210K",
        currency="USD",
        payment_progress=32,

        renewal_type="Automatic",
        notice_period="45 Days",
        auto_renewal="Enabled",

        created_on="25 Feb 2026",
        effective_date="01 Mar 2026",
        expiry_date="01 Mar 2027",
        renewal_reminder="15 Jan 2027",

        documents=5,
        obligations=8,
        tasks=4,
    ),

    Contract(
        id="CTR-004",
        company="Adobe",
        contract="Creative Cloud Business",
        category="Software",
        value="$90K",
        owner="Emily",
        status="Active",
        compliance=88,
        renewal="17 Sep 2026",

        start_date="10 Jan 2026",
        end_date="10 Jan 2027",
        days_remaining=185,
        priority="Medium",
        description="Adobe Creative Cloud enterprise subscription.",

        paid_amount="$45K",
        outstanding="$45K",
        currency="USD",
        payment_progress=50,

        renewal_type="Automatic",
        notice_period="60 Days",
        auto_renewal="Enabled",

        created_on="05 Jan 2026",
        effective_date="10 Jan 2026",
        expiry_date="10 Jan 2027",
        renewal_reminder="10 Nov 2026",

        documents=4,
        obligations=6,
        tasks=2,
    ),
]


def get_all_contracts():
    return contracts


def get_contract_by_id(contract_id: str):
    for contract in contracts:
        if contract.id == contract_id:
            return contract
    return None


def create_contract(contract: Contract):
    contracts.append(contract)
    return contract


def update_contract(contract_id: str, updated_contract: Contract):
    for index, contract in enumerate(contracts):
        if contract.id == contract_id:
            updated_contract.id = contract_id
            contracts[index] = updated_contract
            return updated_contract
    return None


def delete_contract(contract_id: str):
    for contract in contracts:
        if contract.id == contract_id:
            contracts.remove(contract)
            return {"message": "Contract deleted successfully"}
    return None