import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductComponent = () => {
    const [products, setProducts] = useState([]);
    const [file, setFile] = useState(null);
    const [productData, setProductData] = useState({
        name: '',
        price: '',
    });

    // Fetch all products
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error("There was an error fetching the products!", error);
        }
    };

    // Handle file input change
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Upload CSV file
    const handleFileUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);
    
        try {
            const response = await axios.post('http://localhost:8080/api/products/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data); // Check the response in console
            alert(response.data);
            fetchProducts(); // Refresh product list after upload
        } catch (error) {
            alert('Error uploading file');
            console.error(error);
        }
    };
    

    // Download CSV file
    const handleExportCSV = () => {
        axios({
            url: 'http://localhost:8080/api/products/export',
            method: 'GET',
            responseType: 'blob', // Important for downloading files
        })
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'products.csv'); // Specify file name
                document.body.appendChild(link);
                link.click();
            })
            .catch((error) => {
                console.error("Error downloading file", error);
            });
    };

    // Handle input changes for new product
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Add new product
    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/products', productData);
            alert('Product added!');
            fetchProducts(); // Refresh product list
        } catch (error) {
            alert('Error adding product');
            console.error(error);
        }
    };

    // Delete product by ID
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/products/${id}`);
            fetchProducts(); // Refresh product list after deletion
        } catch (error) {
            console.error("Error deleting product", error);
        }
    };

    return (
        <div>
            <h1>Product Management</h1>

            {/* Upload CSV Section */}
            <div>
                <h2>Upload CSV</h2>
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleFileUpload}>Upload</button>
            </div>

            {/* Add Product Form */}
            <div>
                <h2>Add Product</h2>
                <form onSubmit={handleAddProduct}>
                    <input
                        type="text"
                        name="name"
                        value={productData.name}
                        onChange={handleInputChange}
                        placeholder="Product Name"
                        required
                    />
                    <input
                        type="number"
                        name="price"
                        value={productData.price}
                        onChange={handleInputChange}
                        placeholder="Product Price"
                        required
                    />
                    <button type="submit">Add Product</button>
                </form>
            </div>

            {/* Products Table */}
            <div>
                <h2>Product List</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>
                                    <button onClick={() => handleDelete(product.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Export CSV Button */}
            <div>
                <button onClick={handleExportCSV}>Export to CSV</button>
            </div>
        </div>
    );
};

export default ProductComponent;
