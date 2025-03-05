import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateOtherAdmin } from "../../features/adminAuthSlice";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";

const UpdateOtherAdmin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams(); 
    
    const { admins, error, isLoading } = useSelector((state) => state.adminAuth);
    const admin = admins.find((a) => a.id === parseInt(id));
    
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        first_name: "",
        last_name: ""
    });
    
    useEffect(() => {
        if (admin) {
            setFormData({
                username: admin.username || "",
                email: admin.email || "",
                first_name: admin.first_name || "",
                last_name: admin.last_name || ""
            });
        }
    }, [admin]);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateOtherAdmin({ id, updatedData: formData })).then((result) => {
            if (!result.error) navigate("/admin/admins"); 
        });
    };

    return (
        <AdminLayout>
            <div className="max-w-md mx-auto bg-lightBackground dark:bg-card shadow-lg rounded-lg p-6 border border-lightBorder dark:border-borderGray">
                <h2 className="text-2xl font-semibold text-dark dark:text-white mb-4 text-center font-sans">
                    Update Admin
                </h2>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-500 text-sm rounded-md p-4 mb-4">
                        {typeof error === "object" ? (
                            Object.entries(error).map(([key, messages]) => (
                                <div key={key} className="mb-2">
                                    <strong className="capitalize">{key.replace(/_/g, " ")}:</strong>
                                    <ul className="ml-4 list-disc">
                                        {Array.isArray(messages) ? messages.map((msg, i) => <li key={i}>{msg}</li>) : <li>{messages}</li>}
                                    </ul>
                                </div>
                            ))
                        ) : (
                            <p>{error}</p>
                        )}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-dark dark:text-grayText">Username</label>
                        <input
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg bg-lightCard dark:bg-modalBackground border-lightBorder dark:border-borderGray text-dark dark:text-white focus:ring-2 focus:ring-highlight focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-dark dark:text-grayText">Email</label>
                        <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg bg-lightCard dark:bg-modalBackground border-lightBorder dark:border-borderGray text-dark dark:text-white focus:ring-2 focus:ring-highlight focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-dark dark:text-grayText">First Name</label>
                        <input
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg bg-lightCard dark:bg-modalBackground border-lightBorder dark:border-borderGray text-dark dark:text-white focus:ring-2 focus:ring-highlight focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-dark dark:text-grayText">Last Name</label>
                        <input
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg bg-lightCard dark:bg-modalBackground border-lightBorder dark:border-borderGray text-dark dark:text-white focus:ring-2 focus:ring-highlight focus:outline-none"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-highlight hover:bg-highlightHover text-white font-semibold px-4 py-2 rounded-lg transition-all disabled:opacity-50"
                        disabled={isLoading}
                    >
                        {isLoading ? "Updating..." : "Update Admin"}
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
};

export default UpdateOtherAdmin;
