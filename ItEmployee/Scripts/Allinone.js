 function ChangeUrl(page, url) {
        if (typeof (history.pushState) != "undefined") {
            var obj = { Page: page, Url: url };
            history.pushState(obj, obj.Page, obj.Url);
        } else {
            alert("Browser does not support HTML5.");
        }
}

function addRow(segmentService, segmentType) {
    const row = `<tr>
        <td>1</td>
        <td data-fulltext="${segmentService}">${segmentService.length > 10 ? segmentService.substring(0, 10) + '...' : segmentService}</td>
        <td data-fulltext="${segmentType}">${segmentType.length > 10 ? segmentType.substring(0, 10) + '...' : segmentType}</td>
        <!-- other columns -->
    </tr>`;
    document.getElementById('tbodygrid').innerHTML += row;
}

var is_select_dept = "";
var holdotp = "";
$(document).ready(function () {
    $('#btnsaveuser').click(function () {
        Saveuser();
    })
    $('[id*=ddldepartment]').change(function () {
        is_select_dept = "Y";
        BindEmployeedata();
        return false;

    })
    $('[id*=btnsearchdoc]').click(function () {
        if ($('[id*=txtdocs]').val() == "Department") {
            window.open('Departments.aspx');
            return false;
        }
        else if ($('[id*=txtdocs]').val() == "User creation") {
            window.open('Default.aspx');
            return false;
        }
        else if ($('[id*=txtdocs]').val() == "Ticket Dashboard") {
            window.open('TicketDashboard.aspx');
            return false;
        }
    })

    $('#exampleModal').click(function () {
        $('#exampleModal').hide();
        return false;
    })
   


    $('#first,#second,#third,#fourth').keyup(function () {
        if (this.value.length == $(this).attr("maxlength")) {
            $(this).next().focus();
        }
    });
 



    $('[id$=btnfrmdt]').val(new Date().toLocaleDateString('en-CA'));
    $('[id$=btntodt]').val(new Date().toLocaleDateString('en-CA'));
    $('[id$=btngo]').click(function () {
        var Difference_In_Time = new Date($('[id$=btntodt]').val()).getTime() - new Date($('[id$=btnfrmdt]').val()).getTime()

        // To calculate the no. of days between two dates
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        if (Difference_In_Days > 15) {
            alert('Date Difference only 15 days');
            return false;
        }
        is_filter = "";
        BindGrid('A');
    })
    $('[id$=btnexcel]').click(function () {
        filename = 'EmpTickets.xlsx';
        var data = Listdata;
        var ws = XLSX.utils.json_to_sheet(data);
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "People");
        XLSX.writeFile(wb, filename);
        return false;
    })
    $('[id$=logout').click(function () {
        window.location = "login.aspx";
        window.localStorage.clear();
        sessionStorage.clear();
        localStorage.clear();
        return false;
    });
    if (window.location.pathname.split('/')[1] == "TicketDashboard.aspx") {
        //BinDummyata();
        $('[id$=spnuser]').html(localStorage.getItem('User_name'));
        $('[id$=spnuserlogindt]').html(localStorage.getItem('Date'));
        
        BindEmployeedata();
        BindGrid('A');
        BindSementtypelist();
    }
    if (window.location.pathname.split('/')[1] == "Departments.aspx" || window.location.pathname.split('/')[1] == "Default.aspx" || window.location.pathname.split('/')[1] == "TicketDashboard.aspx") {
       
        BindDepts();
      
    }
    if (window.location.pathname.split('/')[1] == "Default.aspx") {
        BindUsers();
    }
    
    $('#ddlsegment').change(function () {
        BindSementtypelist();
    })
    var params = new URLSearchParams(window.location.search);
    var user_name = params.get("User_name");
    $('[id$=name]').val(user_name);
    $('#dateval').val(new Date().toLocaleDateString('en-CA'));

    

})
function Saveticket() {
    if ($('[id$=ddlstatus]').val() == 1) {
        holdotp = "";
        var otpval = Math.floor(1000 + Math.random() * 9000); // Generate OTP
        var mobile = "7702267567"; // Mobile number
        var otp = otpval;
        holdotp = otp;

        // Send OTP via SMS
        var win = window.open("http://jst.smsmobile.co.in/index.php/api/bulk-sms?username=LUCIDM&password=Lucid@12345&from=LUCIDM&to=" + mobile + "&message=" + otp + " : is your One Time Password(OTP). LUCID Medical Diagnostics. For assistance Call Toll Free : 1800 12345 77&sms_type=2&template_id=1707162844462158910");

        // Close the window after a short delay (adjust as necessary)
        setTimeout(function () {
            win.close();
        }, 150);

        openPopup();
       // $('#first').focus(); // Focus on the first input in the modal
    } else {
        Savefunc(); // Call Save function if the status is not 1
        return false;
    }
}


function openPopup() {
    document.getElementById("otpOverlay").style.display = "flex";
}

// Function to close the OTP popup
function closePopup() {
    document.getElementById("otpOverlay").style.display = "none";
    clearOtpInputs();
}

// Function to move to the next input box
function moveToNext(current, nextFieldId) {
    if (current.value.length === current.maxLength) {
        document.getElementById(nextFieldId).focus();
    }
}

// Function to move to the previous input box if backspace is pressed
function moveToPrevious(current, previousFieldId) {
    if (event.key === "Backspace" && current.value.length === 0) {
        document.getElementById(previousFieldId).focus();
    }
}

// Function to clear all OTP inputs
function clearOtpInputs() {
    document.getElementById("otp1").value = '';
    document.getElementById("otp2").value = '';
    document.getElementById("otp3").value = '';
    document.getElementById("otp4").value = '';
}

// Function to handle OTP submission
function submitOtp() {
    const otp = document.getElementById("otp1").value +
        document.getElementById("otp2").value +
        document.getElementById("otp3").value +
        document.getElementById("otp4").value;


    //$('#first,#second,#third,#fourth,#fifth,#sixth')
    var enteredotp = otp;
    if (enteredotp == holdotp) {
        Savefunc();
        return false;
    }
    else {
        alert('Enter Valid OTP');
        return false;
    }
    
    closePopup(); // Close popup after submitting
}



function Saveuser() {
    var username = $('[id$=name]').val();
    var password = $('[id$=Password]').val();
    var phone_no = $('[id$=Phoneno]').val();
    var email = $('[id$=Email]').val();
    var dob = $('[id$=dateval]').val();

    if (username == "" || username == undefined) {
        alert('Enter Username');
        return false;
    }
    else if (password == "" || password == undefined) {
        alert('Enter Password');
        $('[id$=Password]').focus();
        return false;

    }
    else if (phone_no == "" || phone_no == undefined) {
        alert('Enter Phone no');
        $('[id$=Phoneno]').focus();
        return false;
    }
    else if (email == "" || email == undefined) {
        aler('Enter Email');
        $('[id$=Email]').focus();
        return false;
    }
    else if ($('[id*=hdnseldeptid]').val() == "" || $('[id*=hdnseldeptid]').val() == undefined) {
        alert('Select Department');
        
        return false;
    }
    else if (new Date($('[id$=dateval]').val()).toDateString() == new Date().toDateString()) {
        alert('Select Dob');
        return false;
    }


    var gender = $('input[name="gender"]:checked').val();
    var deptid = $('[id*=hdnseldeptid]').val();
    var role = $('input[name="role"]:checked').val();
    $.ajax({
        type: "POST", url: "login.aspx/Usercreation", data: "{'User_name':'" + username + "','Password':'" + password + "','phone_no':'" + phone_no + "','email':'" + email + "','dob':'" + dob + "','gender':'" + gender + "','deptid':'" + deptid + "','role':'" + role + "'}", contentType: "application/json; charset=utf-8", dataType: "json",
        //async: false,
        success: function (data) {
            var Dtt = data.d;
            if (Dtt[0].Column1 > 0) {
                alert('Saved Succefully!..');
                window.location = "Default.aspx";
                return false;
            }

            else {
                alert('Save Failed!..');
                return false;

            }

            // return false;
        },
        error: function () { }
    });
}
function filterInput(element) {
    // Allow only alphanumeric characters (no spaces or special characters)
    element.value = element.value.replace(/[^a-zA-Z0-9]/g, '');
}
function Savefunc() {
    
        var loc_id = $('[id$=ddllocation]').val();
        var Segment_id = $('[id$=ddlsegment]').val();
        var Segment_type = $('[id$=ddltype]').val();
        var ddlproblemdesc = $('[id$=ddlprblemdesc]').val();
        var support = $('[id$=ddlsupport]').val();
        var priority = $('[id$=ddlpriority]').val();
        var esttime = $('[id$=ddlesttime]').val();
        var status = $('[id$=ddlstatus]').val();
    var remarks = $('[id$=txtremarks]').val();
    var dept_id = $('[id*=ddldepartment]').val();
    var flag = "";
    var otp = holdotp;
    var manager_nums = "";
        var ticket_no = "";
        if ($('#hdnflag').val() != "" && $('#hdnflag').val() != undefined) {
            flag = "E";
            ticket_no = $('[id$=hdnticketno]').val();
        }
        else {
            flag = "S";
            ticket_no = $('[id$=ddllocation] option:selected').text().substring(0, 3) + $('[id$=ddlsegment] option:selected').text().split('-')[1];
        }


        if (loc_id == "" || loc_id == "0") {
            alert('Select Location');
            return false;
        }
        else if (Segment_id == "" || Segment_id == "0") {
            alert('Select Service Segment');
            return false;

        }
        else if (Segment_type == "" || Segment_type == "0") {
            alert('Select Service Type Segment');

            return false;
        }
        else if (ddlproblemdesc == "" || ddlproblemdesc == "0") {
            alert('Select problem');
            return false;
        }
        else if (support == "" || support == "0") {
            alert('Select support');
            return false;
        }
        else if (esttime == "" || esttime == "0") {
            alert('Select Esttime');
            return false;
        }
        else if (dept_id == "" || dept_id == "0") {
            alert('Select Department');
            return false;
        }

        else if (priority == "" || priority == "0") {
            alert('Select Priority');
            return false;
        }
        else if (status == "" || status == "0") {
            alert('Select Status');
            return false;
        }
        var create_by = localStorage.getItem("Userid");



        var gender = $('input[name="optradio"]:checked').val();
        $.ajax({
            type: "POST", url: "login.aspx/Saveticket", data: "{'loc_id':'" + loc_id + "','Segment_id':'" + Segment_id + "','Segment_type':'" + Segment_type + "','ddlproblemdesc':'" + ddlproblemdesc + "','support':'" + support + "','esttime':'" + esttime + "','priority':'" + priority + "','status':'" + status + "','remarks':'" + remarks + "','flag':'" + flag + "','ticketno':'" + ticket_no + "','create_by':'" + create_by + "','dept_id':'" + dept_id + "'}", contentType: "application/json; charset=utf-8", dataType: "json",
            //async: false,
            success: function (data) {
                var Dtt = data.d;
                if (Dtt[0].CNT > 0) {
                    alert('Saved Succefully!..');
                    closePopup();
                    $('#otp1,#otp2,#otp3,#otp4').val("");
                    $('#hdnflag').val('');
                    $('[id$=ddllocation]').val("0");
                    $('[id$=ddlsegment]').val("0");
                    $('[id$=ddltype]').val("0");
                    $('[id$=ddlprblemdesc]').val("0");
                    $('[id$=ddlsupport]').val("0");
                    $('[id$=ddlpriority]').val("0");
                    $('[id$=ddlesttime]').val("0");
                    $('[id$=ddlstatus]').val("0");
                    $('[id$=txtremarks]').val("");
                    $('[id$=hdnticketno]').val("");
                    BindGrid('A');
                    return false;
                }

                else {
                    alert('Save Failed!..');
                    return false;

                }

                // return false;
            },
            error: function () { }
        });
    
}

function Login() {
    var User_name = $('[id$=username').val();
    var Password = $('[id$=password').val();
    $.ajax({
        type: "POST", url: "login.aspx/Login", data: "{'User_name':'" + User_name + "','Password':'" + Password + "'}", contentType: "application/json; charset=utf-8", dataType: "json",
        //async: false,
        success: function (data) {
            var Dtt = data.d;
            if (Dtt[0].IS_EXISTED > 0) {
                var date = new Date().format('dd-MMM-yyyy HH:mm');
                localStorage.setItem('Userid', Dtt[0].EMP_ID);
                localStorage.setItem('User_name', User_name);
                localStorage.setItem('Date', date );
               
                window.location = "TicketDashboard.aspx";
                return false;
            }
            else if (Dtt[0].IS_EXISTED < 0) {
                alert('Invalid Credentials');
                return false;
            }
            else {
                window.location = "Default.aspx?User_name=" + User_name+"";
                return false;

            }

            // return false;
        },
        error: function () { }
    });
}


function EditData(loc_id, Segment_id, segment_type_id, prob_desc_id, sup_emp_id, support_priority, est_time_id, remarks, obj,status,dept_id,dept_name) {
    $('#tbodygrid tr').css('background-color', '');
    $(obj).closest('tr').css('background-color', '#adc7a5');
    $('#hdnflag').val('E');
    $('[id$=ddllocation]').val(loc_id);
    $('[id$=ddlsegment]').val(Segment_id);
    $('[id$=ddltype]').val(segment_type_id);
    $('[id$=ddlprblemdesc]').val(prob_desc_id);
    $('[id$=ddlsupport]').val(sup_emp_id);
    $('[id$=ddlpriority]').val(support_priority);
    $('[id$=ddlesttime]').val(est_time_id);
    $("#ddlsupport").html('');
    $('[id$=ddldepartment]').val(dept_id);
    $("#ddlsupport").append($('<option></option>').val(dept_id).html(dept_name));
    $('[id$=txtremarks]').val(remarks);
    $('[id$=hdnticketno]').val($(obj).closest('tr').find('td:eq(0)').html());
    $('[id$=ddlstatus]').val(status);

    

}

var Listdata = [];
function BindGrid(obj) {
    Listdata = [];
    var user_id = 1;
    var tr = "";
    var fromdt = new Date($('[id$=btnfrmdt]').val()).format('dd-MMM-yyyy')
    var to_dt = new Date($('[id$=btntodt]').val()).format('dd-MMM-yyyy');
    if (is_filter != "Y") {
        var opencnt = 0; closedcnt = 0; pendingcnt = 0;
    }

    $.ajax({
        type: "POST", url: "login.aspx/BindGrid", data: "{'User_id':'" + user_id + "','from_dt':'" + fromdt + "','to_dt':'" + to_dt + "','Status':'" + obj + "'}", contentType: "application/json; charset=utf-8", dataType: "json",
        async: false,
        success: function (data) {
            var Dtt = data.d;
            for (var i = 0; i <= Dtt.length-1; i++){
                var status_name = "";
                
                if (Dtt[i].STATUS == "1") {
                    status_name = "Closed";
                    if (is_filter != "Y") {
                        closedcnt++;
                    }
                } else if (Dtt[i].STATUS == "2") {
                    status_name = "Open";
                    if (is_filter != "Y") {
                        opencnt++;
                    }
                }
                else {
                    status_name = "Pending";
                    if (is_filter != "Y") {
                        pendingcnt++;
                    }
                }
                Listdata.push({ 'Ticket No': Dtt[i].TICKET_NO, 'Location': Dtt[i].LOCATION_NAME, 'Segment Service': Dtt[i].SERVICE_SEGMENT, 'Segment Type': Dtt[i].TYPE_NAME, 'Problem Desc': Dtt[i].PROBLEM_DESC, 'Assign to': Dtt[i].IT_EMP_USER_NAME, 'Priority': Dtt[i].PRIORITY, 'Estim Time': Dtt[i].EST_TIME, 'Status': status_name, 'Remarks': Dtt[i].REMARKS, 'Create By': Dtt[i].IT_EMP_USER_NAME, 'Create Dt': Dtt[i].CREATE_DT})
                tr += "<tr><th>" + (i+1) + "</th><td>" + Dtt[i].TICKET_NO + "</td><td>" + Dtt[i].LOCATION_NAME + "</td><td>" + Dtt[i].SERVICE_SEGMENT + "</td><td>" + Dtt[i].TYPE_NAME + "</td>"
                tr += "<td>" + Dtt[i].PROBLEM_DESC + "</td><td>" + Dtt[i].IT_EMP_USER_NAME + "</td><td>" + Dtt[i].PRIORITY + "</td><td>" + Dtt[i].EST_TIME + "</td>"
                tr += "<td>" + status_name + "</td><td>" + Dtt[i].REMARKS + "</td><td>" + Dtt[i].IT_EMP_USER_NAME + "</td><td>" + Dtt[i].CREATE_DT + "</td><td>" + Dtt[i].DEPARTMENT_NAME + "</td>"
                tr += "<td><input type='button' class='btn btn-sm btn-primary' value='Edit' onclick='EditData(" + Dtt[i].LOCATION_ID + "," + Dtt[i].SERVICE_SEGMENT_ID + "," + Dtt[i].SEGMENT_TYPE_ID + "," + Dtt[i].PROBLEM_DESC_ID + "," + Dtt[i].SUPPORT_EMP_ID + "," + Dtt[i].SUPPORT_PRIORITY + "," + Dtt[i].ESTIMATION_TIME + ",\"" + Dtt[i].REMARKS + "\",this," + Dtt[i].STATUS + "," + Dtt[i].DEPT_ID + ",\"" + Dtt[i].DEPARTMENT_NAME + "\")'</td></tr>";
            }
            $('#tbodygrid').html(tr);
            $('#spnopen').html(opencnt);
            $('#spnpending').html(pendingcnt);
            $('#spnclosed').html(closedcnt);
           //tbodygrid
            // return false;
        },
        error: function () { }
    });
}

var is_filter = "";
function Opentickets(obj) {
    if (obj == "O") {
        $('#hclosed').removeClass('selected');
        $('#hpending').removeClass('selected');
        $('#hopen').addClass('selected');
    }
    else if (obj == "C") {
        $('#hopen').removeClass('selected');
        $('#hpending').removeClass('selected');
        $('#hclosed').addClass('selected');
    }
    else if (obj == "P") {
        $('#hopen').removeClass('selected');
        $('#hpending').addClass('selected');
        $('#hclosed').removeClass('selected');
    }
    is_filter = "Y";
    BindGrid(obj);
}
function BindEmployeedata() {
    $("#ddlsupport").html('');
    var user_id = 1;
    var dept_id = $('[id*=ddldepartment]').val();
    $.ajax({
        type: "POST", url: "login.aspx/BindEmployeedata", data: "{'User_id':'" + user_id + "','Dept_id':'" + dept_id + "'}", contentType: "application/json; charset=utf-8", dataType: "json",
        async: false,
        success: function (data) {
            var Dtt = data.d;
            if (is_select_dept == "") {
                BindEsttime();
                BindProblempriority();
                BindProblems(); BindSegments(); BindLocations();
            }
            $("#ddlsupport").append('<option "selected" value="0">--Select--</option>');
            $.each(Dtt, function (key, value) {
                $("#ddlsupport").append($('<option></option>').val(value.IT_EMPS_ID).html(value.IT_EMP_NAME));
            });

            // return false;
        },
        error: function () { }
    });
}



function BindUsers() {
   
    var user_id = 1;
    var dept_id = "";
    var tr = "";
    $.ajax({
        type: "POST", url: "login.aspx/BindEmployeedata", data: "{'User_id':'" + user_id + "','Dept_id':'" + dept_id + "'}", contentType: "application/json; charset=utf-8", dataType: "json",
        async: false,
        success: function (data) {
            var Dtt = data.d;
            for (var i = 0; i <= Dtt.length - 1; i++) {
                var gender = ""; Rolename = "";
                if (Dtt[i].IT_EMP_GENDER == 1) {
                    gender = "Male";
                }
                else if (Dtt[i].IT_EMP_GENDER == 2) {
                    gender = "Female";
                }
                else {
                    gender = "Unspecified";
                }
                if (Dtt[i].ROLE_ID == "1") {
                    Rolename = "Manager";
                }
                if (Dtt[i].ROLE_ID == "2") {
                    Rolename = "Asst Manager";
                }
                if (Dtt[i].ROLE_ID == "3") {
                    Rolename = "Excutive";
                }
                tr += "<tr><td>" + Dtt[i].IT_EMP_NAME + "</td><td>" + Dtt[i].IT_EMP_EMAIL + "</td><td>" + Dtt[i].IT_EMP_PHONE + "</td><td>" + gender + "</td><td>" + Dtt[i].IT_EMP_DOB + "</td><td>" + Dtt[i].DEPARTMENT_NAME + "</td><td>" + Rolename + "</td><td><input type='button' value='Edit' onclick='return Edituserdata(this," + Dtt[i].DEPT_ID + ")'</td></tr>"
            }
            $('#userDataTableBody').html(tr);
            return false;
            // return false;
        },
        error: function () { }
    });
}


function Edituserdata(obj, dept_id) {
    var usr_name = $(obj).closest('tr').find('td:eq(0)').html();
    var Email = $(obj).closest('tr').find('td:eq(1)').html();
    var Phone_no = $(obj).closest('tr').find('td:eq(2)').html();
    var Gender = $(obj).closest('tr').find('td:eq(3)').html();
    var Gender = $(obj).closest('tr').find('td:eq(3)').html();
    var Dob = $(obj).closest('tr').find('td:eq(4)').html();
    var Deptname = $(obj).closest('tr').find('td:eq(5)').html();
    var role = $(obj).closest('tr').find('td:eq(6)').html();
    $('[id*=hdnseldeptid]').val(dept_id);
    $('#name').val(usr_name);
    $('#Email').val(Email);
    $('#Phoneno').val(Phone_no);
    if (Gender == "Male") {
        $('[name*=gender][value="1"]').prop("checked", true);

        
    }
    else if (Gender == "Female") {
        $('[name*=gender][value="2"]').prop("checked", true);
    }
    
    if (role == "Manager") {
        $('[name*=role][value="1"]').prop("checked", true);
       
    }
    else if (role == "Asst Manager") {
        $('[name*=role][value="2"]').prop("checked", true);
    }
    else {
        $('[name*=role][value="3"]').prop("checked", true);
    }


    // Convert the date to 'YYYY-MM-DD' format
    var formattedDate = new Date(Dob).toISOString().split('T')[0];

    $('#dateval').val(formattedDate);
    $('#txtdepartment').val(Deptname);
}

function BindDocuments() {
    var user_id = 1;
    if (sessionStorage.getItem('Docnames') == "" || sessionStorage.getItem('Docnames') == null || sessionStorage.getItem('Docnames') == undefined) {
        $.ajax({
            type: "POST", url: "login.aspx/BindDocuments1", data: "{'User_id':'" + user_id + "'}", contentType: "application/json; charset=utf-8", dataType: "json",
            async: false,
            success: function (data) {
                var Dtt = data.d;
                for (var i = 0; i <= Dtt.length-1; i++) {
                    suggestionsData.push({ 'name': Dtt[i].DOC_NAME, 'id': Dtt[i].TICKET_DOC_ID });
                    
                }
                sessionStorage.setItem('Docnames', JSON.stringify(suggestionsData));
                // return false;
            },
            error: function () { }
        });
    }
    
}

function Editdeptdata(obj,deptid) {
    var deptname = $(obj).closest('tr').find('td:eq(0)').html();
    var deptcd = $(obj).closest('tr').find('td:eq(1)').html();
    var deptdesc = $(obj).closest('tr').find('td:eq(2)').html();
    $('#MainContent_deptname').val(deptname);
    $('#MainContent_deptdesc').val(deptdesc);
    $('[id*=hdndeptid]').val(deptid);
}

function BindDepts() {
    var tr = "";
    $('#MainContent_tblDepartments tbody').append('');
    var user_id = 1;
    $.ajax({
        type: "POST", url: "login.aspx/BindDepts", data: "{'User_id':'" + user_id + "'}", contentType: "application/json; charset=utf-8", dataType: "json",
        async: false,
        success: function (data) {
            var Dtt = data.d;
            if (window.location.pathname.split('/')[1] == "TicketDashboard.aspx") {
                $("#ddldepartment").append('<option "selected" value="0">--Select--</option>');
            }
            for (var i = 0; i <= Dtt.length - 1; i++) {
                if (window.location.pathname.split('/')[1] == "TicketDashboard.aspx") {

                    $("#ddldepartment").append($('<option></option>').val(Dtt[i].TICKET_DEPARTMENT).html(Dtt[i].TICKET_DEPARTMENT_NAME));
                }
                Departmentsdata.push({ 'name': Dtt[i].TICKET_DEPARTMENT_NAME, 'id': Dtt[i].TICKET_DEPARTMENT });
                tr += "<tr><td>" + Dtt[i].TICKET_DEPARTMENT_NAME + "</td><td>" + Dtt[i].TICKET_DEPARTMENT_CD + "</td><td>" + Dtt[i].TICKET_DEPARTMENT_DESC + "</td><td><input type='button' value='Edit' onclick='return Editdeptdata(this," + Dtt[i].TICKET_DEPARTMENT +")'</td></tr>"
            }
            $('#MainContent_tblDepartments tbody').append(tr);
            // return false;
        },
        error: function () { }
    });
}
function SaveDept() {
    var deptname = $('#MainContent_deptname').val().trim();
    var deptdesc = $('#MainContent_deptdesc').val().trim();
    $.ajax({
        type: "POST", url: "login.aspx/SaveDept", data: "{'Department_name':'" + deptname + "','Department_Desc':'" + deptdesc + "'}", contentType: "application/json; charset=utf-8", dataType: "json",
        async: false,
        success: function (data) {
            var Dtt = data.d;
            if (Dtt[0].UPDATED == "I") {
                alert('Saved successfully');
            }
            else if (Dtt[0].UPDATED == "U") {
                alert('Updated successfully');
                
            }
            else {
                alert('Failed');

            }
            $('#MainContent_deptname,#MainContent_deptdesc').val('');
            BindDepts();
            return false;

            // return false;
        },
        error: function () { }
    });
}



function BinDummyata() {
    var user_id = 1;
    $.ajax({
        type: "POST", url: "login.aspx/GetCustomers", data: "{'User_id':'" + user_id + "'}", contentType: "application/json; charset=utf-8", dataType: "json",
        async: false,
        success: function (data) {
            var Dtt = data.d;
          

            // return false;
        },
        error: function () { }
    });
}


function BindEsttime() {
    var user_id = 1;
    $.ajax({
        type: "POST", url: "login.aspx/BindEsttime", data: "{'User_id':'" + user_id + "'}", contentType: "application/json; charset=utf-8", dataType: "json",
        async: false,
        success: function (data) {
            var Dtt = data.d;
            $("#ddlesttime").append('<option "selected" value="0">--Select--</option>');
            $.each(Dtt, function (key, value) {
                $("#ddlesttime").append($('<option></option>').val(value.IT_EMP_EST_TIME_ID).html(value.Est_Time));
            });

            // return false;
        },
        error: function () { }
    });
}
function BindProblempriority() {
    var user_id = 1;
    $.ajax({
        type: "POST", url: "login.aspx/BindProblempriority", data: "{'User_id':'" + user_id + "'}", contentType: "application/json; charset=utf-8", dataType: "json",
        async: false,
        success: function (data) {
            var Dtt = data.d;
            $("#ddlpriority").append('<option "selected" value="0">--Select--</option>');
            $.each(Dtt, function (key, value) {
                $("#ddlpriority").append($('<option></option>').val(value.IT_EMP_PROBLEM_priority_id).html(value.Priority));
            });

            // return false;
        },
        error: function () { }
    });
}
function BindProblems() {
    var user_id = 1;
    $.ajax({
        type: "POST", url: "login.aspx/BindProblems", data: "{'User_id':'" + user_id + "'}", contentType: "application/json; charset=utf-8", dataType: "json",
        async: false,
        success: function (data) {
            var Dtt = data.d;
            $("#ddlprblemdesc").append('<option "selected" value="0">--Select--</option>');
            $.each(Dtt, function (key, value) {
                $("#ddlprblemdesc").append($('<option></option>').val(value.IT_EMP_PROBLEMS_ID).html(value.PROBLEM_DESC));
            });

            // return false;
        },
        error: function () { }
    });
}
function BindSementtypelist() {
    $("#ddltype").html('');
    var Segment_id = $('#ddlsegment').val();
    $.ajax({
        type: "POST", url: "login.aspx/BindSementtypelist", data: "{'Segment_id':'" + Segment_id + "'}", contentType: "application/json; charset=utf-8", dataType: "json",
        async: false,
        success: function (data) {
            var Dtt = data.d;
            $("#ddltype").append('<option "selected" value="0">--Select--</option>');
            $.each(Dtt, function (key, value) {
                $("#ddltype").append($('<option></option>').val(value.IT_EMP_SEGMENT_TYPE_ID).html(value.TYPE_NAME));
            });

            // return false;
        },
        error: function () { }
    });
}
function BindSegments() {
    var user_id = 1;
    $.ajax({
        type: "POST", url: "login.aspx/BindSegments", data: "{'User_id':'" + user_id + "'}", contentType: "application/json; charset=utf-8", dataType: "json",
        async: false,
        success: function (data) {
            var Dtt = data.d;
            $("#ddlsegment").append('<option "selected" value="0">--Select--</option>');
            $.each(Dtt, function (key, value) {
                $("#ddlsegment").append($('<option></option>').val(value.IT_EMP_SERVICE_SEGMENT_ID).html(value.SERVICE_SEGMENT + '-' + value.SERVICE_SEGMENT_CD));
            });

             return false;
        },
        error: function () { }
    });
}
function BindLocations() {
    var user_id = 1;
    $.ajax({
        type: "POST", url: "login.aspx/BindLocations", data: "{'User_id':'" + user_id + "'}", contentType: "application/json; charset=utf-8", dataType: "json",
        async: false,
        success: function (data) {
            var Dtt = data.d;
            $("#ddllocation").append('<option "selected" value="0">--Select--</option>');
            $.each(Dtt, function (key, value) {
                $("#ddllocation").append($('<option></option>').val(value.LOCATION_ID).html(value.LOCATION_NAME));
            });

             return false;
        },
        error: function () { }
    });
}