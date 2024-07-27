export type loginForm = {
    email: string,
    password: string,
    showPassword: boolean
};


export type loginRequest = {
    email: string,
    password: string
};

export type loginResponse = {
    token: string
};

export type failureResponse = {
    message : string
}

export type successResponse = {
    message : string
}

export type User = {
    _id : string,
    firstname : string,
    lastname : string, 
    email : string,
    username : string,
    role : Role
}

export type AuthDetails = {
    token : string,
    isLoggedIn: boolean,
    user: User | null,
    login: (token : string) => void
    logout: () => void,
    papers : Paper[],
    reviewers : Reviewer[],
    curDeadline : DeadlineResponse | null,
}


 

export type Paper  = {
    _id: string,
    title: string,
    description : string,
    status: status,
    tags : string[],
}

export type status =     'PENDING' | 'REVIEWED' |'ACCEPTED' | 'REJECTED';

export type Role = "USER" | "REVIEWER" | "PROGRAM_COMMITTEE";


export type Reviewer = {
    _id : string,
    firstname : string,
    lastname : string,
    email : string,
    expert_at : string[],
    assigned_papers : string[]
}

export type ReviewerForm = {
    email: string,
    password: string,
    confirmPassword: string,
    showPassword: boolean,
    firstname: string,
    lastname: string,
    expert_at : string
}

export type addReviewerRequest = {
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    expert_at : string[]
}

export type DeadlineResponse = {
    _id : string,
    deadline : string
}

export type Document = {
    _id : string,
    original_name : string,
    file : Buffer,
    changes_description : string,
    updated_at : string,
}

export type Review = {
    _id : string,
    body : string,
    rating : number,
}

 