<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Departments.aspx.cs" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    
    <style>
        /* Expanded full-width styling */
        #wrapper {
            padding: 20px 10%;
        }
        .card {
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            border: none;
            border-radius: 8px;
        }
        .card-title {
            font-size: 1.5rem;
            font-weight: bold;
            color: #333;
        }
        .table thead {
            background-color: #007bff;
            color: white;
        }
        .table td, .table th {
            vertical-align: middle;
            text-align: center;
        }
        .table tbody tr:hover {
            background-color: #f5f5f5;
        }
    </style>

    <div id="wrapper" class="container-fluid">
        <div class="content-page">
            <div class="content">
                <div class="col-md-12 p-0">
                    <div class="card p-3">
                        <h5 class="card-title border-bottom pb-2">
                           Department Creation
                        </h5>
                        <div class="card-text">
                            
                            <!-- Form to create department -->
                            <div class="col-md-12 mb-3">
                                <div class="row">
                                    <div class="col-md-7 col-xl-6">
                                        <label for="deptname" class="form-label">Department Name</label>
                                        <input type="text" class="form-control form-control-sm" id="deptname" placeholder="Enter department name" runat="server" />
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-12 mb-3">
                                <div class="row">
                                    <div class="col-md-7 col-xl-6">
                                        <label for="deptdesc" class="form-label">Department Description</label>
                                        <textarea class="form-control form-control-sm" id="deptdesc" rows="3" placeholder="Enter department description" runat="server"></textarea>
                                    </div>
                                </div>
                            </div>

                            <!-- Submit Button -->
                            <div class="col-md-2 mb-3">
                                <button class="btn btn-sm btn-primary w-100" id="btnclick" runat="server" onclick="return SaveDept()">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Table to display submitted departments -->
                <div class="col-md-12 mt-4">
                    <h5>Department List</h5>
                    <table class="table table-bordered table-hover" id="tblDepartments" runat="server">
                        <thead>
                            <tr>
                                <th>Department Name</th>
                                <th>Department Code</th>
                                <th>Department Description</th>
                                <th>Manage</th>
                            </tr>
                        </thead>
                        <tbody id="depttbody">
                            <!-- Data will be populated here -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <input type="hidden" id="hdndeptid" runat="server" />
</asp:Content>
