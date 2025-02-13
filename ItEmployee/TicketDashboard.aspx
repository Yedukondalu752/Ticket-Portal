<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="TicketDashboard.aspx.cs"  %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
     <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">


    <style>

          body {
            font-family: Arial, sans-serif;
        }
        /* Background overlay */
        .overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: none;
            justify-content: center;
            align-items: center;
        }
        /* Popup box */
        .popup {
            background: white;
            padding: 20px;
            border-radius: 8px;
            width: 300px;
            text-align: center;
        }
        .otp-inputs {
            display: flex;
            gap: 10px;
            justify-content: center;
            margin-top: 10px;
        }
        .otp-inputs input {
            width: 40px;
            padding: 10px;
            text-align: center;
            font-size: 18px;
        }
        .popup button {
            margin-top: 15px;
            padding: 10px 20px;
            cursor: pointer;
        }

        .selected {
    color: red; /* Change this to whatever color you want */
    border-bottom: 2px solid red; /* Optional: Add a border to indicate selection */
}
    /* Align table headers and content */
/* Apply only to table with specific ID */

 /* Apply only to this table by ID */
    #yourSecondTableID th, #yourSecondTableID td {
        white-space: nowrap;
        text-align: center;
        vertical-align: middle;
    }

    /* Adjust header alignment for long labels */
    #yourSecondTableID th {
        text-overflow: ellipsis;
        overflow: hidden;
        max-width: 150px; /* Adjust as needed */
        white-space: nowrap;
    }

    /* For cells with long content */
    #yourSecondTableID td {
        text-overflow: ellipsis;
        overflow: hidden;
        max-width: 150px; /* Adjust for table column width */
        white-space: nowrap;
        position: relative;
    }

    /* Show full content on hover */
    #yourSecondTableID td:hover::after {
        content: attr(data-fulltext);
        position: absolute;
        background-color: #fff;
        padding: 5px;
        border: 1px solid #ccc;
        white-space: normal;
        z-index: 1000;
        max-width: 300px;
        top: 100%;
        left: 0;
    }

    /* Make sure select and textarea elements are properly displayed */
    #yourSecondTableID select, 
    #yourSecondTableID textarea {
        max-width: 100px; /* Adjust based on your preference */
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    /* Button inside table */
    #yourSecondTableID button {
        white-space: nowrap;
    }


    #tblgriddata th, #tblgriddata td {
        white-space: nowrap;
        text-align: center;
        vertical-align: middle;
    }

    /* Adjust header alignment for long labels */
    #tblgriddata th {
        text-overflow: ellipsis;
        overflow: hidden;
        max-width: 150px; /* Adjust as needed */
        white-space: nowrap;
    }

    /* For cells with long content */
    #tblgriddata td {
        text-overflow: ellipsis;
        overflow: hidden;
        max-width: 150px; /* Adjust for table column width */
        white-space: nowrap;
        position: relative;
    }

    /* Show full content on hover */
    #tblgriddata td:hover::after {
        content: attr(data-fulltext);
        position: absolute;
        background-color: #fff;
        padding: 5px;
        border: 1px solid #ccc;
        white-space: normal;
        z-index: 1000;
        max-width: 300px;
        top: 100%;
        left: 0;
    }


</style>
   <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.min.js"></script>


<script type="text/javascript">

    
        
    
    document.querySelectorAll('#otp input').forEach(input => {
        input.addEventListener('focus', function () {
            const modal = document.getElementById('exampleModal');
            modal.setAttribute('data-bs-backdrop', 'static');
            modal.setAttribute('data-bs-keyboard', 'false');
        });
    });
    document.addEventListener("DOMContentLoaded", function (event) {

        function OTPInput() {
            const inputs = document.querySelectorAll('#otp > *[id]');
            for (let i = 0; i < inputs.length; i++) { inputs[i].addEventListener('keydown', function (event) { if (event.key === "Backspace") { inputs[i].value = ''; if (i !== 0) inputs[i - 1].focus(); } else { if (i === inputs.length - 1 && inputs[i].value !== '') { return true; } else if (event.keyCode > 47 && event.keyCode < 58) { inputs[i].value = event.key; if (i !== inputs.length - 1) inputs[i + 1].focus(); event.preventDefault(); } else if (event.keyCode > 64 && event.keyCode < 91) { inputs[i].value = String.fromCharCode(event.keyCode); if (i !== inputs.length - 1) inputs[i + 1].focus(); event.preventDefault(); } } }); }
        } OTPInput();
    });
</script>
    <div id="wrapper">
        <div class="content-page">
            <div class="content">
                <div class="col-md-12 p-0">
                    <div class="card p-2">
                        <div class="card-title border-bottom py-1 d-flex justify-content-between">
                        <h3 class="m-0">Ticket Information
                        </h3>
                           <div class="d-flex align-items-center justify-content-start py-2 px-3 border rounded bg-light">
    <div class="d-flex align-items-center me-4">
        <h4 class="mb-0 fw-bold text-primary" style="cursor:pointer" onclick="return Opentickets('O')" id="hopen">Open</h4>
        <span id="spnopen" class="badge bg-primary ms-2 fs-5 d-flex align-items-center">0</span>
    </div>
    <div class="d-flex align-items-center me-4">
        <h5 class="mb-0 fw-bold text-warning" style="cursor:pointer" onclick="return Opentickets('P')" id="hpending">Pending</h5>
        <span id="spnpending" class="badge bg-warning ms-2 fs-5 d-flex align-items-center">0</span>
    </div>
    <div class="d-flex align-items-center">
        <h5 class="mb-0 fw-bold text-success" style="cursor:pointer" onclick="return Opentickets('C')" id="hclosed">Closed</h5>
        <span id="spnclosed" class="badge bg-success ms-2 fs-5 d-flex align-items-center">0</span>
    </div>
</div>


                        <h3 class="m-0"><i class="fas fa-file-excel" aria-hidden="true" id="btnexcel" title="Excel" style="color:green;cursor:pointer"></i></h3></div>
                        <div class="card-text">
                            <div class="table-responsive">
    <table id="yourSecondTableID" class="table table-striped table-hover table-bordered">
        <thead class="table-primary">
            <tr>
                <th scope="col">S No.</th>
                <th scope="col">Location</th>
                <th scope="col">Service</th>
                <th scope="col">Type</th>
                <th scope="col">Dec</th>
                <th scope="col">Department</th>
                <th scope="col">Support</th>
                <th scope="col">Priority</th>
                <th scope="col">Estim Time</th>
                <th scope="col">Status</th>
                <th scope="col">Remarks</th>
                <th scope="col"></th>
                <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th scope="row">1</th>
                <td>
                    <select class="form-select" id="ddllocation"></select>
                </td>
                <td>
                    <select class="form-select" id="ddlsegment"></select>
                </td>
                <td>
                    <select class="form-select" id="ddltype"></select>
                </td>
                <td>
                    <select class="form-select" id="ddlprblemdesc"></select>
                </td>
                <td>
                    <select class="form-select" id="ddldepartment"></select>
                </td>
                <td>
                    <select class="form-select" id="ddlsupport"></select>
                </td>
                <td>
                    <select class="form-select" id="ddlpriority"></select>
                </td>
                <td>
                    <select class="form-select" id="ddlesttime"></select>
                </td>
                <td>
                    <select class="form-select" id="ddlstatus">
                        <option value="0">select</option>
                        <option value="1">Closed</option>
                        <option value="2">Open</option>
                        <option value="3">Pending</option>
                    </select>
                </td>
                <td>
                    <textarea id="txtremarks" placeholder="Enter text here..." oninput="filterInput(this)"></textarea>
                </td>
                <td>
                    <button class="btn btn-sm btn-primary" id="btnotourl" style="display:none">OTP</button>
                </td>
                <td>
                    <input type="button" id="btnsaveticket" class="btn btn-primary" value="Save" onclick="Saveticket()" />
                </td>
                <td style="display:none">
                    <a id="callurl"></a>
                </td>
            </tr>
        </tbody>
    </table>
</div>
                            <div>
   
       
    





                            </div>
                            <div class="table-responsive">
    <div class="card-title border-bottom py-1">
        <input type="date" id="btnfrmdt" />
        <input type="date" id="btntodt" />
        <input class="btn btn-sm btn-primary" type="button" id="btngo" value="Go" />
    </div>
    <div style="overflow:auto; max-height: 66rem;">
        <table id="tblgriddata" class="table table-striped table-hover table-bordered">
            <thead class="table-primary">
                <tr>
                    <th scope="col">S No.</th>
                    <th scope="col">Ticket No</th>
                    <th scope="col">Location</th>
                    <th scope="col">Segment Service</th>
                    <th scope="col">Segment Type</th>
                    <th scope="col">Problem Desc</th>
                    <th scope="col">Assign to</th>
                    <th scope="col">Priority</th>
                    <th scope="col">Estim Time</th>
                    <th scope="col">Status</th>
                    <th scope="col">Remarks</th>
                    <th scope="col">Create By</th>
                    <th scope="col">Create Dt</th>
                    <th scope="col">Department</th>
                    <th scope="col">Manage</th>
                </tr>
            </thead>
            <tbody id="tbodygrid">
                <tr>
                    <td data-fulltext="1">1</td>
                    <td data-fulltext="TICKET1234567890">TICKET1234567890</td>
                    <td data-fulltext="Location Name">Location Name</td>
                    <!-- Add data-fulltext for each td that has long content -->
                </tr>
            </tbody>
        </table>
    </div>
</div>



                        </div>
                    </div>





<div>
  


</div>
                </div>

            </div>



        </div>
    </div>
   
    <div id="otpOverlay" class="overlay">
    <div class="popup">
        <h3>Enter OTP</h3>
        <div class="otp-inputs">
            <input type="text" maxlength="1" id="otp1" oninput="moveToNext(this, 'otp2')">
            <input type="text" maxlength="1" id="otp2" oninput="moveToNext(this, 'otp3')" onkeydown="moveToPrevious(this, 'otp1')">
            <input type="text" maxlength="1" id="otp3" oninput="moveToNext(this, 'otp4')" onkeydown="moveToPrevious(this, 'otp2')">
            <input type="text" maxlength="1" id="otp4" onkeydown="moveToPrevious(this, 'otp3')">
        </div>
        <button onclick="submitOtp()">Submit</button>
        <button onclick="closePopup()">Close</button>
    </div>
</div>
    <input type="hidden" id="hdnflag" />

     <input type="hidden" id="hdnticketno" />
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.min.js"></script>
    <script type="text/javascript">
        document.getElementById('btnOpenModal').addEventListener('click', function () {
            $('#exampleModal').fadeIn();
            return false;
            // Any custom logic can go here if needed
        });

    </script>
</asp:Content>


