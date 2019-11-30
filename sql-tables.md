USER

    user_id: numeric -> USER_ROLE_JUNCTION
    username: text
    password: text
    first_name: text
    last_name: text
    email: text
    
ROLE 
    role: text //Finance-Manager, Admin, User
    role_id:numeric -> USER_ROLE_JUNCTION

USER_JOIN_ROLE //assign
    user_id -> USER
    role_id -> ROLE

REIMBURSEMENT
    reimbursement_id: numeric
    author: numeric -> USERS
    amount: numeric
    date_submitted: string
    date_resolved: string
    description: string
    resoler: numeric -> USERS
    status: numeric -> STATUS_JOIN_REIMBURSEMENT
    type: numeric -> TYPE_JOIN_REIMBURSEMENT

REIMBURSEMENT_STATUS
    status_id: numeric
    status:text //PENDING, APPROVED, DENIED

STATUS_JOIN_REIMBURSEMENT
    status_id:numeric
    reimbursement_id:numeric

REIMBURSEMENT_TYPE
    type_id: numeric
    type: string //LODGING, TRAVEL, FOOD, OTHER

TYPE_JOIN_REIMBURSEMENT
    type_id
    reimbursement_id