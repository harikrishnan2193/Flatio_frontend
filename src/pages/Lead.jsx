import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { getProjectsAPI, getProjectDetailsAPI, submitProjectBookAPI, getAllBookingsAPI } from '../services/allApi';
import Swal from 'sweetalert2';

import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

function Lead() {
    const [open, setOpen] = useState(false)

    const [selectProjects, setSelectProject] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [formData, setFormData] = useState({
        customerName: '',
        phoneNumber: '',
        projectId: '',
        leadBy: '',
        cpName: '',
        flateName: '',
    });
    console.log(formData);
    const [allProject, setAllProject] = useState([])

    // fetch all projects
    const getProjects = async () => {
        try {
            const result = await getProjectsAPI();
            if (result.status === 200) {
                console.log(result.data);

                const activeProjects = result.data.filter(project => project.projectStatus === true);
                console.log(activeProjects);
                setSelectProject(activeProjects);

            }
        } catch (error) {
            console.error("Error fetching Projects:", error);
        }
    }

    // fetch details of a selected project
    const fetchProjectDetails = async (projectId) => {
        if (!projectId) return;
        try {
            const result = await getProjectDetailsAPI(projectId);
            console.log(result.data);

            if (result.status === 200) {
                console.log(result.data);
                setSelectedProject(result.data);
            }
        } catch (error) {
            console.error("Error fetching project details:", error);
        }
    }

    // handle form input changes
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    // handle form submission
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        try {
            const result = await submitProjectBookAPI(formData);
            console.log(result);
            if (result.status === 201) {
                Swal.fire("Project Booking successfully!");
                setFormData({
                    customerName: '',
                    phoneNumber: '',
                    projectId: '',
                    leadBy: '',
                    cpName: '',
                    flateName: ''
                });
                getProjects()
                allBokkings()
                setSelectedProject(null)
                setOpen(!open)
            }
            else {
                Swal.fire(result.response.data.error._message);
            }
        } catch (error) {
            console.error("Error submitting lead:", error);
        }
    }

    //get all bookings
    const allBokkings = async () => {
        const result = await getAllBookingsAPI()
        console.log(result.data);
        setAllProject(result.data)
    }

    useEffect(() => {
        getProjects();
        allBokkings()
    }, [])

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-100 lg:px-lg-padding xl:px-xl-padding">
                <div className='flex flex-col lg:flex-row justify-center items-start px-8 py-14'>
                    {/* Lead List Section */}
                    <div className="w-full lg:w-2/3 bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-purple-600 text-2xl font-raleway font-bold mb-4 text-center lg:text-left">All Leads</h3>
                        {allProject?.length > 0 ? (
                            allProject.map((project) => (
                                <div key={project.id} className="border flex flex-col sm:flex-row items-center justify-between rounded-lg p-4 m-2 bg-gray-100 shadow-sm">
                                    <div className='flex flex-col'>
                                        <h5 className="text-lg font-medium">{project.customerName}</h5>
                                        <h5 className="text-base font-semibold text-gray-600">{project.phoneNumber}</h5>
                                    </div>
                                    <div className="flex flex-col text-center flex-grow mt-2 sm:mt-0">
                                        <h2>Project: <span className='text-purple-400 font-medium'>{project.projectName}</span></h2>
                                        <h2>Flat: <span className='text-purple-400 font-medium'>{project.flateName}</span></h2>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className='text-center text-gray-400'>No Lead available</p>
                        )}
                    </div>

                    {/* Lead Form */}
                    <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md ml-0 lg:ml-10 mt-10 lg:mt-0">
                        <div className='flex justify-between '>
                            <h2 className="text-purple-500 text-xl font-raleway font-semibold text-center mb-4">Book Your Lead</h2>
                            <button onClick={() => setOpen(!open)}
                                className='border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white px-3 py-2 rounded'>
                                <i class="fa-solid fa-angle-down"></i>
                            </button>
                        </div>

                        <Collapse in={open}>
                            <div id="example-collapse-text">
                                <form onSubmit={handleFormSubmit}>
                                    <div className="mb-4">
                                        <label className="block font-semibold text-gray-800">Customer Name</label>
                                        <input name="customerName" value={formData.customerName} onChange={handleInputChange} type="text"
                                            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm mt-1 outline-none" placeholder="Enter Customer Name" required />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block font-semibold text-gray-800">Phone Number</label>
                                        <input name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} type="tel"
                                            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm mt-1 outline-none" placeholder="Enter Phone Number" required />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block font-semibold text-gray-800">Select Project</label>
                                        <select name="projectId" value={formData.projectId} onChange={(e) => {
                                            handleInputChange(e);
                                            fetchProjectDetails(e.target.value);
                                        }} className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring-2 focus:ring-purple-300" required>
                                            <option value="">Select a Project</option>
                                            {selectProjects.map((project) => (
                                                <option key={project._id} value={project._id}>{project.projectName}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block font-semibold text-gray-800">Lead By</label>
                                        <select name="leadBy" value={formData.leadBy} onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring-2 focus:ring-purple-300" required >
                                            <option value="">Select a Lead</option>
                                            <option value="Cp">Cp</option>
                                            <option value="Direct">Direct</option>
                                        </select>
                                    </div>

                                    {formData.leadBy === "Cp" && selectedProject?.cpDetails?.length > 0 && (
                                        <div className="mb-4">
                                            <label className="block font-semibold text-gray-800">CP Names</label>
                                            <select name="cpName" value={formData.cpName} onChange={handleInputChange}
                                                className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring-2 focus:ring-purple-300" required >
                                                <option value="">Select CP Name</option>
                                                {selectedProject.cpDetails.map((cp) => (
                                                    <option key={cp.id} value={cp.id}>{cp.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    )}

                                    {selectedProject?.flateDetails?.length > 0 && (
                                        <div className="mb-4">
                                            <label className="block font-medium text-gray-700">Select Flat</label>
                                            <select
                                                name="flateName"
                                                value={formData.flateName}
                                                onChange={handleInputChange}
                                                className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring-2 focus:ring-purple-300"
                                                required
                                            >
                                                <option value="">Select a Flat</option>
                                                {selectedProject.flateDetails.map((flate) => (
                                                    <option key={flate.id} value={flate.id}>{flate.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    )}

                                    <button type="submit" className="w-full bg-purple-500 text-white p-2 rounded-lg hover:bg-purple-600 transition duration-300">Submit</button>
                                </form>
                            </div>
                        </Collapse>
                    </div>
                </div>
            </div>
        </>
    );

}

export default Lead;