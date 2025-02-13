<%@ Page Title="Customer Registration" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="CustomerRegistration.aspx.cs" Inherits="ItEmployee.CustomerRegistration" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

    <h2>Customer Registration</h2>
    <style>
        /* Set the background for the main content area */
        body {
            background-color: #f0f0f0; /* Light gray background for the page */
        }

        .section {
            margin-bottom: 20px;
            border: 1px solid #ccc;
            padding: 15px;
            border-radius: 5px;
            background-color: white; /* White background for each section */
        }

        .info-table, .product-table {
            width: 100%;
            border-collapse: collapse;
        }

        .info-table td, .product-table th, .product-table td {
            border: 1px solid #ddd;
            padding: 8px;
        }

        .product-table th {
            background-color: #f2f2f2;
        }

        .product-table tbody tr:hover {
            background-color: #f1f1f1;
        }
    </style>
    
    <!-- Customer Info Table -->
    <div class="section">
        <h3>Customer Information</h3>
        <table class="info-table">
            <tr>
                <td>Name:</td>
                <td><asp:TextBox ID="txtName" runat="server"></asp:TextBox></td>
            </tr>
            <tr>
                <td>Email:</td>
                <td><asp:TextBox ID="txtEmail" runat="server"></asp:TextBox></td>
            </tr>
            <tr>
                <td>Phone:</td>
                <td><asp:TextBox ID="txtPhone" runat="server"></asp:TextBox></td>
            </tr>
        </table>
    </div>

    <!-- Products Table with Autocomplete -->
    <div class="section">
        <h3>Product Selection</h3>
        <input type="text" id="txtProduct" />
        <button type="button" id="btnAddProduct" onclick="addProduct()">Add Product</button>
        
        <table class="product-table">
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody id="productTableBody">
                <!-- Rows will be added dynamically here -->
            </tbody>
        </table>
    </div>

    <!-- Payment Section -->
    <div class="section">
        <h3>Payment</h3>
        <input type="checkbox" id="chkCash" onclick="togglePaymentMethod()" /> Pay by Cash
        <input type="checkbox" id="chkCard" onclick="togglePaymentMethod()" /> Pay by Card

        <div id="cardDetails" style="display:none;">
            <h4>Card Details</h4>
            <table class="info-table">
                <tr>
                    <td>Card Number:</td>
                    <td><input type="text" id="txtCardNumber" /></td>
                </tr>
                <tr>
                    <td>Expiration Date:</td>
                    <td><input type="text" id="txtExpiration" /></td>
                </tr>
                <tr>
                    <td>CVC:</td>
                    <td><input type="text" id="txtCVC" /></td>
                </tr>
            </table>
        </div>
    </div>

    <button type="button" id="btnSubmit" onclick="submitForm()">Submit</button>

    <script>
        function addProduct() {
            const productName = document.getElementById('txtProduct').value;
            const tableBody = document.getElementById('productTableBody');

            if (productName) {
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td>${productName}</td>
                    <td><input type="number" min="1" value="1" /></td>
                    <td><button type="button" onclick="removeProduct(this)">Remove</button></td>
                `;
                tableBody.appendChild(newRow);
                document.getElementById('txtProduct').value = ''; // Clear input
            } else {
                alert('Please enter a product name.');
            }
        }

        function removeProduct(button) {
            const row = button.parentNode.parentNode;
            row.parentNode.removeChild(row);
        }

        function togglePaymentMethod() {
            const cardDetails = document.getElementById('cardDetails');
            cardDetails.style.display = document.getElementById('chkCard').checked ? 'block' : 'none';
        }

        function submitForm() {
            // Add your form submission logic here
            alert('Form submitted!'); // Replace with actual submission logic
        }
    </script>

</asp:Content>
