import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { cpDataSubmitAPI, deleteCpAPI, getAllCpsAPI, updateCpAPI } from "../services/allApi";
import Swal from "sweetalert2";

const Cp = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCpId, setSelectedCpId] = useState(null);
  const [cpData, setCpData] = useState({
    cpName: "",
    phn: "",
    email: "",
  });
  const [allCps, setAllCps] = useState([]);

  // fetch all CPs
  const getAllCps = async () => {
    const result = await getAllCpsAPI();
    setAllCps(result.data);
  }

  // handle Submit (Add / Update)
  const handleSubmitForm = async (e) => {
    e.preventDefault()
    const { cpName, phn, email } = cpData;

    if (!cpName || !phn || !email) {
      Swal.fire("Please fill out all fields");
      return;
    }

    try {
      if (selectedCpId) {
        // update CP
        const result = await updateCpAPI(selectedCpId, cpData);
        if (result.status === 200) {
          Swal.fire("Updated Successfully")
        }
        else {
          Swal.fire(result.response.data.message)
        }
      } else {
        // add new CP
        const result = await cpDataSubmitAPI(cpData);
        if (result.status === 200) {
          Swal.fire(`${result.data.cpName} is successfully added.`);
        }
        else {
          Swal.fire(result.response.data)
        }
      }
      setCpData({ cpName: "", phn: "", email: "" });
      setShowModal(false);
      getAllCps()
      setSelectedCpId(null);
    } catch (error) {
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  }

  // handle Edit (populate data in Modal)
  const handleEdit = (cp) => {
    setCpData({ cpName: cp.cpName, phn: cp.phn, email: cp.email });
    setSelectedCpId(cp._id);
    setShowModal(true);
  }

  // handle delete a cp
  const handleDelete = async (id) => {
    try {
      const result = await deleteCpAPI(id);
      if (result.status === 200) {
        Swal.fire("Deleted Successfully");
        getAllCps();
      }
    } catch (error) {
      Swal.fire("Error!", "Failed to delete CP.", "error");
    }
  }

  useEffect(() => {
    getAllCps();
  }, []);

  return (
    <>
      <Header />
      <div className="mx-auto lg:px-lg-padding xl:px-xl-padding">
        <div className="w-full md:w-2/3 px-8 py-8">
          <div className="text-2xl font-bold my-8">Welcome User</div>

          <div className="card shadow-lg bg-white rounded-lg p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-center p-4 sm:p-6">
              <h3 className="text-purple-600 text-xl sm:text-2xl font-semibold text-center sm:text-left">
                All CPs
              </h3>
              <button
                className="px-4 py-2 mt-3 sm:mt-0 rounded bg-purple-500 text-white hover:bg-purple-600 transition"
                onClick={() => {
                  setShowModal(true);
                  setCpData({ cpName: "", phn: "", email: "" });
                  setSelectedCpId(null);
                }}
              >
                Add CP
              </button>
            </div>

            {allCps?.length > 0 ? (
              allCps.map((cp) => (
                <div
                  key={cp._id}
                  className="border flex flex-col sm:flex-row items-center justify-between rounded-lg p-4 m-2 bg-gray-100 shadow-sm"
                >
                  <h5 className="text-lg font-medium text-center sm:text-left">{cp.cpName}</h5>

                  <div className="flex flex-col text-center flex-grow mt-2 sm:mt-0">
                    <span className="font-semibold text-purple-400 text-sm sm:text-base">{cp.phn}</span>
                    <span className="font-semibold text-purple-400 text-sm sm:text-base">{cp.email}</span>
                  </div>

                  <div className="flex items-center space-x-4 mt-3 sm:mt-0">
                    <button className="text-blue-600 hover:text-blue-800" onClick={() => handleEdit(cp)}>
                      <i className="fas fa-edit text-lg"></i>
                    </button>

                    <button onClick={() => handleDelete(cp._id)} className="text-red-600 hover:text-red-800">
                      <i className="fas fa-trash text-lg"></i>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 mt-4">No CPs available</p>
            )}
          </div>


          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
              <div className="bg-white p-6 rounded-lg w-full sm:w-3/4 md:w-2/3 lg:w-1/3">
                <h2 className="text-xl font-bold mb-4">{selectedCpId ? "Edit CP" : "Add CP"}</h2>
                <input
                  onChange={(e) => setCpData({ ...cpData, cpName: e.target.value })}
                  value={cpData.cpName}
                  type="text"
                  className="w-full border p-2 mb-3"
                  placeholder="Cp Name"
                />
                <input
                  onChange={(e) => setCpData({ ...cpData, phn: e.target.value })}
                  value={cpData.phn}
                  type="text"
                  className="w-full border p-2 mb-3"
                  placeholder="Phone Number"
                />
                <input
                  onChange={(e) => setCpData({ ...cpData, email: e.target.value })}
                  value={cpData.email}
                  type="email"
                  className="w-full border p-2 mb-3"
                  placeholder="Email"
                />
                <div className="flex justify-end space-x-2">
                  <button className="px-4 py-2 bg-gray-400 text-white rounded" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button onClick={handleSubmitForm} className="px-4 py-2 bg-purple-600 text-white rounded">
                    {selectedCpId ? "Update" : "Add"}
                  </button>
                </div>
              </div>
            </div>

          )}
        </div>
      </div>
    </>
  );
};

export default Cp;
