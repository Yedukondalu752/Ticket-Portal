<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="ItEmployee._Default" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
    
    <style>
        /* Additional styling for visual consistency */
        #wrapper {
            padding: 20px 5%;
        }
        .card {
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            border: none;
        }
        .table thead {
            background-color: #007bff;
            color: white;
        }
        .input-group-text {
            cursor: pointer;
        }
        .table td, .table th {
            text-align: center;
            vertical-align: middle;
        }
    </style>
    
    <div id="wrapper" class="container-fluid">
        <div class="content-page">
            <div class="content">
                <div class="col-md-12 p-0">
                    <div class="card p-3">
                        <h5 class="card-title border-bottom pb-2">
                            User Registration
                        </h5>
                        <div class="card-text">
                            <form>
                                <table class="table table-bordered">
    <tr>
        <td><label for="name" class="form-label">Name</label></td>
        <td><input type="text" class="form-control form-control-sm" id="name" placeholder="Name"></td>
        <td><label for="Password" class="form-label">Password</label></td>
        <td>
            <div class="input-group">
                <input type="password" class="form-control form-control-sm" id="Password" placeholder="Password">
                <span class="input-group-text" id="togglePassword">
                    <i class="fas fa-eye" id="eyeIcon"></i>
                </span>
            </div>
        </td>
    </tr>
    <tr>
        <td><label for="Email" class="form-label">Email</label></td>
        <td><input type="email" class="form-control form-control-sm" id="Email" placeholder="Email"></td>
        <td><label for="Phoneno" class="form-label">Phone No</label></td>
        <td><input type="tel" class="form-control form-control-sm" id="Phoneno" placeholder="Phone number" maxlength="10" pattern="\d{10}" inputmode="numeric" oninput="this.value=this.value.replace(/[^0-9]/g,'');" title="Only numbers allowed (10 digits)"></td>
    </tr>
    <tr>
        <td><label class="form-label">Gender</label></td>
        <td>
            <label class="radio-inline" style="margin-right: 10px;"><input type="radio" name="gender" value="1" checked> Male</label>
            <label class="radio-inline ml-2"><input type="radio" name="gender" value="2"> Female</label>
        </td>
        <td><label for="dateval" class="form-label">DOB</label></td>
        <td><input type="date" class="form-control form-control-sm" id="dateval"></td>
    </tr>
    <tr>
        <!-- Department Field -->
        <td><label for="txtdepartment" class="form-label">Department</label></td>
        <td>
            <div class="autocomplete-container1" style="position: relative; width: 100%;">
                <input type="text" id="txtdepartment" class="form-control form-control-sm" placeholder="Search here" style="width: 100%;" autocomplete="off" />
                <ul id="autocomplete-results1" class="list-group position-absolute" 
                    style="width: 100%; z-index: 10; max-height: 150px; overflow-y: auto; display: none; margin-top: 5px;">
                    <!-- Autocomplete options will go here -->
                </ul>
            </div>
        </td>
        <!-- Role Field -->
        <td><label class="form-label">Role</label></td>
        <td>
            <label class="radio-inline"><input type="radio" name="role" value="1" checked> Manager</label>
            <label class="radio-inline ml-2"><input type="radio" name="role" value="2"> Assistant Manager</label>
            <label class="radio-inline ml-2"><input type="radio" name="role" value="3"> Executive Manager</label>
        </td>
    </tr>
</table>


                                <div class="text-center my-3">
                                    <input type="button"  class="btn btn-primary btn-sm" id="btnsaveuser"   value="submit" />
                                    
                                </div>
                            </form>
                            
                            <!-- User Data Table -->
                            <h5 class="mt-4">User Data</h5>
                            <table class="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>User Name</th>
                                        <th>Email</th>
                                        <th>Phone No</th>
                                        <th>Gender</th>
                                        <th>DOB</th>
                                        <th>Department</th>
                                        <th>Role</th>
                                        <th>Manage</th>
                                    </tr>
                                </thead>
                                <tbody id="userDataTableBody">
                                    <!-- Dynamically added user rows -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
