import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { deleteAprojectAPI, getAllCpsAPI, getAllFlatesAPI, getProjectsAPI, submitProjectAPI, updateProjectAPI } from '../services/allApi';
import Swal from 'sweetalert2';

function Projects() {
  const [showModal, setShowModal] = useState(false)
  const [showEditModel, setShowEditModel] = useState(false)

  const [cpOptions, setCpOptions] = useState([]);
  const [flateOptions, setFlateOptions] = useState([]);

  const [allProject, setAllProject] = useState([])
  console.log(allProject);

  const [formDatas, setFormDatas] = useState({
    projectName: "",
    cityRegion: "",
    address: "",
    selectedCPs: [],
    selectedFlates: [],
  })
  const [searchCP, setSearchCP] = useState("");
  const [searchFlate, setSearchFlate] = useState("");
  const [cpDropdownOpen, setCpDropdownOpen] = useState(false);
  const [flateDropdownOpen, setFlateDropdownOpen] = useState(false);

  const [selectedProjectId, setSelectedProjectId] = useState(null)

  //get all cps
  const getCps = async () => {
    const result = await getAllCpsAPI()
    console.log(result.data);
    setCpOptions(result.data)
  }

  //get all flates
  const getFlats = async () => {
    const result = await getAllFlatesAPI()
    console.log(result);
    setFlateOptions(result.data)
  }

  const handleCPSelect = (cpId, cpName) => {
    console.log(cpId, cpName);
    if (cpId && !formDatas.selectedCPs.includes(cpId)) {
      setFormDatas((prev) => ({
        ...prev,
        selectedCPs: [...prev.selectedCPs, cpId],
      }));
    }
    setSearchCP("");
    setCpDropdownOpen(false);
  };

  const handleFlateSelect = (flateId, flateName) => {
    if (flateId && !formDatas.selectedFlates.includes(flateId)) {
      setFormDatas((prev) => ({
        ...prev,
        selectedFlates: [...prev.selectedFlates, flateId],
      }));
    }
    setSearchFlate("");
    setFlateDropdownOpen(false);
  };

  const handleRemoveCP = (cpId) => {
    setFormDatas((prev) => ({
      ...prev,
      selectedCPs: prev.selectedCPs.filter((id) => id !== cpId),
    }));
  };

  const handleRemoveFlate = (flateId) => {
    setFormDatas((prev) => ({
      ...prev,
      selectedFlates: prev.selectedFlates.filter((id) => id !== flateId),
    }));
  }

  //submit project form
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    console.log(formDatas);
    const { projectName, cityRegion, address, selectedCPs, selectedFlates } = formDatas
    if (!projectName || !cityRegion || !address || !selectedCPs || !selectedFlates) {
      Swal.fire('Please select all the fileds')
    }
    else {
      const result = await submitProjectAPI(formDatas);
      console.log(result);

      if (result.status === 201) {
        Swal.fire(result.data.message);
        getAllProjects()
        getFlats()
        setShowModal(false)
        setFormDatas({ projectName: "", cityRegion: "", address: "", selectedCPs: [], selectedFlates: [] });
      }
      else {
        console.error("Error submitting project:", error);
      }
    }
  }

  //submit edited form
  const handleSubmitEditForm = async (e) => {
    e.preventDefault();
    console.log(formDatas)
    console.log(selectedProjectId);

    const result = await updateProjectAPI(selectedProjectId, formDatas)
    console.log(result);
    if (result.status === 200) {
      Swal.fire(result.data.message);
      getAllProjects()
      getFlats()
      setShowEditModel(false)
      //set all fileds empty
      setFormDatas({
        projectName: "",
        cityRegion: "",
        address: "",
        selectedCPs: [],
        selectedFlates: [],
      })
    }


  }

  //delete a project
  const deleteAproject = async (projectId) => {
    console.log(projectId);
    const result = await deleteAprojectAPI(projectId)
    console.log(result);
    if (result.status === 200) {
      Swal.fire(result.data.message)
      getAllProjects()
      getFlats()
    }
    else {
      Swal.fire(result.data.message)
    }
  }

  //get all projects
  const getAllProjects = async () => {
    const result = await getProjectsAPI()
    // console.log(result.data);
    setAllProject(result.data)
  }

  // handle Edit (populate data in Modal)
  const handleEdit = (project) => {
    console.log(project);
    console.log(project.selectedCps.map(cp => cp.name));

    setFormDatas({ projectName: project.projectName, cityRegion: project.region, address: project.address, selectedCPs: [], selectedFlates: [] });
    setSelectedProjectId(project._id)
    setShowEditModel(true)
    // setShowModal(true);
  }

  const handleEditModel = () => {
    setShowEditModel(false)
    setFormDatas({
      projectName: "",
      cityRegion: "",
      address: "",
      selectedCPs: [],
      selectedFlates: [],
    })
  }

  useEffect(() => {
    getCps();
    getFlats();
    getAllProjects()
  }, [])

  return (
    <>
      <Header />
      <div className="mx-auto lg:px-lg-padding xl:px-xl-padding">
        <div className="w-full md:w-2/3 px-8 py-8">
          <div className="text-2xl font-bold my-8">Welcome To Projects</div>

          <div className="card shadow-lg bg-white rounded-lg p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-center p-4 sm:p-6">
              <h3 className="text-purple-600 text-xl sm:text-2xl font-semibold text-center sm:text-left">
                All Projects
              </h3>
              <button
                className="px-4 py-2 mt-3 sm:mt-0 rounded bg-purple-500 text-white hover:bg-purple-600 transition"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                Add New
              </button>
            </div>


            {allProject?.length > 0 ?
              allProject.map((project) => (
                <div
                  key=''
                  className="border flex flex-col sm:flex-row items-center justify-between rounded-lg p-4 m-2 bg-gray-100 shadow-sm"
                >
                  <div className='flex flex-col'>
                    <h5 className="text-lg font-medium sm:text-left">{project.projectName}</h5>
                    <h5 className="text-base font-semibold sm:text-left">{project.region}</h5>
                    <h5 className="text-sm font-normal sm:text-left">{project.address}</h5>
                  </div>

                  <div className="flex flex-col text-center flex-grow mt-2 sm:mt-0">
                    {project.selectedCps?.length > 0 ?
                      project.selectedCps.map((cp) => (
                        <span className="font-semibold text-purple-400 text-sm sm:text-base" value={cp.id}>{cp.name}</span>
                      ))
                      : <p>No Cps</p>
                    }
                    {project.selectedFlates?.length > 0 ?
                      project.selectedFlates.map((flat) => (
                        <span className="font-semibold text-purple-400 text-sm sm:text-base" value={flat.id}>{flat.name}</span>
                      ))
                      : <p>No flats</p>
                    }
                  </div>

                  <div className="flex items-center space-x-4 mt-3 sm:mt-0">
                    <button onClick={() => handleEdit(project)} className="text-blue-600 hover:text-blue-800">
                      <i className="fas fa-edit text-lg"></i>
                    </button>
                    <button onClick={() => deleteAproject(project._id)} className="text-red-600 hover:text-red-800">
                      <i className="fas fa-trash text-lg"></i>
                    </button>
                  </div>
                </div>
              ))
              :
              <p className='text-center text-gray-400'>No Project avilable</p>
            }

          </div>


          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
              <form onSubmit={handleSubmitForm} className="bg-white p-6 rounded-lg w-full sm:w-3/4 md:w-2/3 lg:w-1/3">
                <h2 className="text-xl font-bold mb-4">Add Project</h2>
                <input value={formDatas.projectName} onChange={(e) => setFormDatas({ ...formDatas, projectName: e.target.value })}
                  type="text"
                  className="w-full border p-2 mb-3"
                  placeholder="Project Name"
                />
                <input value={formDatas.cityRegion} onChange={(e) => setFormDatas({ ...formDatas, cityRegion: e.target.value })}
                  type="text"
                  className="w-full border p-2 mb-3"
                  placeholder="Enter your region/city"
                />
                <input value={formDatas.address} onChange={(e) => setFormDatas({ ...formDatas, address: e.target.value })}
                  type="text"
                  className="w-full border p-2 mb-3"
                  placeholder="Enter Adress"
                />

                {/* CP selection with search */}
                <div className="relative mt-1">
                  <div
                    className="w-full p-2 border rounded cursor-pointer"
                    onClick={() => setCpDropdownOpen(!cpDropdownOpen)}
                  >
                    {"Select CP"}
                  </div>
                  {cpDropdownOpen && (
                    <div className="absolute w-full bg-white border rounded shadow-lg mt-1 z-50">
                      <input
                        type="text"
                        className="w-full p-2 border-b"
                        placeholder="Search CP hear..."
                        value={searchCP}
                        onChange={(e) => setSearchCP(e.target.value)}
                      />
                      <ul className="max-h-40 overflow-auto">
                        {cpOptions
                          .filter((cp) => cp.cpName.toLowerCase().includes(searchCP.toLowerCase()))
                          .map((cp) => (
                            <li
                              key={cp._id}
                              className="p-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => handleCPSelect(cp._id, cp.cpName)}
                            >
                              {cp.cpName}
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="mt-2">
                  {formDatas.selectedCPs.map((cpId) => (
                    <span key={cpId} className="bg-gray-200 p-1 rounded m-1 inline-block">
                      {cpOptions.find((cp) => cp._id === cpId)?.cpName}
                      <button onClick={() => handleRemoveCP(cpId)} className="ml-2 text-red-500">x</button>
                    </span>
                  ))}
                </div>

                {/* flat selection with search */}
                <div className="relative mt-1">
                  <div
                    className="w-full p-2 border rounded cursor-pointer"
                    onClick={() => setFlateDropdownOpen(!flateDropdownOpen)}
                  >
                    {"Select Flat"}
                  </div>
                  {flateDropdownOpen && (
                    <div className="absolute w-full bg-white border rounded shadow-lg mt-1 z-50">
                      <input
                        type="text"
                        className="w-full p-2 border-b"
                        placeholder="Search Flat hear..."
                        value={searchFlate}
                        onChange={(e) => setSearchFlate(e.target.value)}
                      />
                      <ul className="max-h-40 overflow-auto">
                        {flateOptions
                          .filter((flate) => flate.flateName.toLowerCase().includes(searchFlate.toLowerCase()))
                          .map((flate) => (
                            <li
                              key={flate._id}
                              className="p-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => handleFlateSelect(flate._id, flate.flateName)}
                            >
                              {flate.flateName}
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="mt-2">
                  {formDatas.selectedFlates.map(flateId => (
                    <span key={flateId} className="bg-gray-200 p-1 rounded m-1 inline-block">
                      {flateOptions.find(flate => flate._id === flateId)?.flateName}
                      <button onClick={() => handleRemoveFlate(flateId)} className="ml-2 text-red-500">x</button>
                    </span>
                  ))}
                </div>

                <div className="flex justify-end space-x-2">
                  <button className="px-4 py-2 bg-gray-400 text-white rounded" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded">
                    Add
                  </button>
                </div>
              </form>
            </div>

          )}

          {/* Edit Model */}
          {showEditModel && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
              <form onSubmit={handleSubmitEditForm} className="bg-white p-6 rounded-lg w-full sm:w-3/4 md:w-2/3 lg:w-1/3">
                <h2 className="text-xl font-bold mb-4">Add Project</h2>
                <input value={formDatas.projectName} onChange={(e) => setFormDatas({ ...formDatas, projectName: e.target.value })}
                  type="text"
                  className="w-full border p-2 mb-3"
                  placeholder="Project Name"
                />
                <input value={formDatas.cityRegion} onChange={(e) => setFormDatas({ ...formDatas, cityRegion: e.target.value })}
                  type="text"
                  className="w-full border p-2 mb-3"
                  placeholder="Enter your region/city"
                />
                <input value={formDatas.address} onChange={(e) => setFormDatas({ ...formDatas, address: e.target.value })}
                  type="text"
                  className="w-full border p-2 mb-3"
                  placeholder="Enter Adress"
                />

                {/* CP selection with search */}
                <div className="relative mt-1">
                  <div
                    className="w-full p-2 border rounded cursor-pointer"
                    onClick={() => setCpDropdownOpen(!cpDropdownOpen)}
                  >
                    {"Select CP"}
                  </div>
                  {cpDropdownOpen && (
                    <div className="absolute w-full bg-white border rounded shadow-lg mt-1 z-50">
                      <input
                        type="text"
                        className="w-full p-2 border-b"
                        placeholder="Search CP..."
                        value={searchCP}
                        onChange={(e) => setSearchCP(e.target.value)}
                      />
                      <ul className="max-h-40 overflow-auto">
                        {cpOptions
                          .filter((cp) => cp.cpName.toLowerCase().includes(searchCP.toLowerCase()))
                          .map((cp) => (
                            <li
                              key={cp._id}
                              className="p-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => handleCPSelect(cp._id, cp.cpName)}
                            >
                              {cp.cpName}
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="mt-2">
                  {formDatas.selectedCPs.map((cpId) => (
                    <span key={cpId} className="bg-gray-200 p-1 rounded m-1 inline-block">
                      {cpOptions.find((cp) => cp._id === cpId)?.cpName}
                      <button onClick={() => handleRemoveCP(cpId)} className="ml-2 text-red-500">x</button>
                    </span>
                  ))}
                </div>

                {/* flat selection with search */}
                <div className="relative mt-1">
                  <div
                    className="w-full p-2 border rounded cursor-pointer"
                    onClick={() => setFlateDropdownOpen(!flateDropdownOpen)}
                  >
                    {"Select Flat"}
                  </div>
                  {flateDropdownOpen && (
                    <div className="absolute w-full bg-white border rounded shadow-lg mt-1 z-50">
                      <input
                        type="text"
                        className="w-full p-2 border-b"
                        placeholder="Search Flat..."
                        value={searchFlate}
                        onChange={(e) => setSearchFlate(e.target.value)}
                      />
                      <ul className="max-h-40 overflow-auto">
                        {flateOptions
                          .filter((flate) => flate.flateName.toLowerCase().includes(searchFlate.toLowerCase()))
                          .map((flate) => (
                            <li
                              key={flate._id}
                              className="p-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => handleFlateSelect(flate._id, flate.flateName)}
                            >
                              {flate.flateName}
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="mt-2">
                  {formDatas.selectedFlates.map(flateId => (
                    <span key={flateId} className="bg-gray-200 p-1 rounded m-1 inline-block">
                      {flateOptions.find(flate => flate._id === flateId)?.flateName}
                      <button onClick={() => handleRemoveFlate(flateId)} className="ml-2 text-red-500">x</button>
                    </span>
                  ))}
                </div>

                <div className="flex justify-end space-x-2">
                  <button className="px-4 py-2 bg-gray-400 text-white rounded" onClick={handleEditModel}>
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded">
                    Update
                  </button>
                </div>
              </form>
            </div>

          )}
        </div>
      </div>
    </>
  )
}

export default Projects