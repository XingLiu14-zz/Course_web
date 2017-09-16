function validation() {
	var err = 0

    valDisNam();

    valEml(err);

    valPhNum(err);

    valZip(err);

    valPswd(err);

    if(err > 0) return false;
    return true;
}

//check display name changes
function valDisNam() {
    var updDisNam = document.getElementById("updDisNam")
    if(updDisNam.value) {
        updated('disNam', updDisNam, 'disNamMsg')
    }
    else {
        noInput('disNamMsg')
    }
}

//chech email changes
function valEml(err) {
    var updEml = document.getElementById("updEml")
    if(updEml.value) {
        if(regExMatch(/^\w+@[a-zA-Z0-9]+?\.[a-zA-Z]{2,3}$/, updEml)) {
            updated('eml', updEml, 'emlMsg', 'emlErr')
        }
        else {
            wrongInput('emlMsg', 'emlErr', err)
        }
    }
    else {
        noInput('emlMsg', 'emlErr')
    }
}

//check phone number changes
function valPhNum(err) {
    var updPhNum = document.getElementById("updPhNum")
    if(updPhNum.value) {
        if(regExMatch(/\d\d\d-\d\d\d-\d\d\d\d/, updPhNum)) {
            updated('phNum', updPhNum, 'phNumMsg', 'phNumErr')
        }
        else {
            wrongInput('phNumMsg', 'phNumErr', err)
        }
    }
    else {
        noInput('phNumMsg', 'phNumErr')
    }
}

//check zipcode changes
function valZip(err) {
    var updZip = document.getElementById("updZip")
    if(updZip.value) {
        if(regExMatch(/\d\d\d\d\d/, updZip)) {
            updated('zip', updZip, 'zipMsg', 'zipErr')
        }
        else {
            wrongInput('zipMsg', 'zipErr', err)
        }
    }
    else {
        noInput('zipMsg', 'zipErr')
    }
}

//check password changes
function valPswd(err) {
    var updPswd = document.getElementById("updPswd")
    var updCfPswd = document.getElementById("updCfPswd")
    if(updPswd.value || updCfPswd.value) {
        if(updPswd.value === updCfPswd.value) {
            updated('pswd', updPswd, 'pswdMsg', 'cfPswdErr', 'cfPswd', updCfPswd)
        }
        else {
            wrongInput('pswdMsg', 'cfPswdErr', err)        }
    }
    else {
        noInput('pswdMsg', 'cfPswdErr')
    }
}

//regular expression match
function regExMatch(regEx, updateId) {
    return regEx.test(updateId.value)
}

//when the change pass the check, update the infomation and show the message
function updated(infoId, updId, msgId, errId, extraId, extraUpd) {
    var prev = document.getElementById(infoId).innerHTML
    var curr = updId.value;
    document.getElementById(msgId).innerHTML = "changed from \x22" + prev + "\x22 to \x22" + curr +"\x22"
    document.getElementById(infoId).innerHTML = curr
    document.getElementById(msgId).style.display = "block"
    if(errId !== undefined) {
        document.getElementById(errId).style.display = "none"
    }
    if(extraId !== undefined) {
        document.getElementById(extraId).innerHTML = curr
    }
    updId.value = ""
    if(extraUpd !== undefined) {
        extraUpd.value = ""
    }
}

//when the change fail to pass the check, show the notification
function wrongInput(msgId, errId, err) {
    document.getElementById(msgId).style.display = "none"
    if(errId !== undefined && err !== undefined) {
        document.getElementById(errId).style.display = "block"
        err++
    }
}

//when there's no input, make message and notification disappear
function noInput(infoMsg, infoErr) {
    document.getElementById(infoMsg).style.display = "none"
    if(infoErr !== undefined) {
        document.getElementById(infoErr).style.display = "none";
    }
}


