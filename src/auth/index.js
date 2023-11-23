//isLoggedIn=>

export const isLoggedIn = () => {
    let data = localStorage.getItem("email");
    if (data != null) return true;
    else return false;
};

export const isMfa = () => {
    let data = localStorage.getItem("data");
    if (data != null) return true;
    else return false;
};

export const isMfaEnab = () => {
    let data = localStorage.getItem("data");
    if (data != null) return true;
    else return false;
};

//dologin => data => set to localStorage

export const doLogin=(data,next)=>{
    localStorage.setItem("email",JSON.stringify(data));
    next()
};


export const doMfa=(data,next)=>{
    localStorage.setItem("data",JSON.stringify(data));
    next()
};


//doLogout => remove from local storage


export const doLogout=(next)=>{
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    next()
};

//getCurrent user


export const getCurrentUserDetail = () =>{
    if(isLoggedIn()){
        return JSON.parse(localStorage.getItem("email")).user;
    } else {
        return undefined;
    }
}