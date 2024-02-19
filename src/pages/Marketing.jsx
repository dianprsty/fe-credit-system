import axios from "axios";
import { useEffect, useState } from "react";
import { formatDate } from "../helpers/formatDate";
import { formatPrice } from "../helpers/formatPrice";
import LoanStatusPill from "../components/LoanStatusPill";
import { useNavigate } from "react-router-dom";

const Marketing = () => {
  const [loans, setLoans] = useState([]);
  const navigate = useNavigate();

  const getLoans = async () => {
    const token = localStorage.getItem("token");
    return await axios.get("http://localhost:8080/loans", {
      headers: {
        Authorization: "bearer " + token,
      },
    });
  };

  useEffect(() => {
    getLoans().then((res) => {
      console.log(res.data);
      setLoans(res.data.data);
    });
  }, []);

  const handleLogout = () => {
    const token = localStorage.getItem("token");
    localStorage.clear();
    axios.post("http://localhost:8080/auth/logout", {
      headers: { Authorization: "bearer " + token },
    });
    navigate("/login");
  };

  return (
    <>
      <div className="p-2 navbar bg-primary text-primary-content">
        <div className="navbar-start">
          <a className="text-xl btn btn-ghost">Marketing</a>
        </div>

        <div className="flex gap-4 navbar-end">
          <a
            onClick={navigate("/loans/create")}
            className="text-white btn btn-success"
          >
            Buat Pengajuan
          </a>
          <a onClick={handleLogout} className="text-white btn btn-warning">
            Logout
          </a>
        </div>
      </div>
      <div className="flex flex-col gap-8 p-4">
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-bold text-center">
            Daftar Pengajuan Pinjaman
          </h1>
          <div className="overflow-x-auto rounded-md">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr className="bg-primary text-primary-content">
                  <th>No</th>
                  <th>Nama Customer</th>
                  <th>Tanggal Pengajuan</th>
                  <th>Status</th>
                  <th>Dealer</th>
                  <th>Kendaraan</th>
                  <th>Harga</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loans.length > 0
                  ? loans.map((element, index) => (
                      <tr key={element.id}>
                        <td>{index + 1}</td>
                        <td>{element.customer.name}</td>
                        <td>{formatDate(new Date(element.createdAt))}</td>
                        <td>
                          <LoanStatusPill
                            status={element.loanStatus.status}
                            statusId={element.loanStatusId}
                          />
                        </td>
                        <td>{element.vehicle.dealer}</td>
                        <td>{element.vehicle.type}</td>
                        <td>{formatPrice(element.vehicle.price)}</td>
                        <td>
                          <button className="text-white btn btn-sm btn-success">
                            Lihat
                          </button>
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Marketing;
