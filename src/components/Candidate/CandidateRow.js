import Link from "next/link";
import React, { useState } from "react";
export default function CandidateRow({
  candidate,
  changeSelectCandidates,
  showBtn
}) {
  const [isSelect, setSelect] = useState(false);

  const handleOnchange = (e) => {
    changeSelectCandidates(e.target.checked, candidate.id);
    showBtn()
  };

  return (
    <tr className="border border-color-2" key={candidate.id}>
      <td scope="row" className="pl-6 border-0 py-7 pr-0">
        <input type="checkbox" onChange={handleOnchange} />
      </td>
      <td scope="row" className="pl-6 border-0 py-7 pr-0">
        <Link href="/dashboard-applicants">
          <a className="media min-width-px-235 align-items-center">
            <div>
              <img
                src={candidate.profileImage}
                alt=""
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  marginRight: 8,
                }}
              />
            </div>
            <h4 className="font-size-4 mb-0 font-weight-semibold text-black-2">
              {candidate.firstName} {candidate.lastName}
            </h4>
          </a>
        </Link>
      </td>
      <td className="table-y-middle py-7 min-width-px-170 pr-0">
        <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
          {candidate.email}
        </h3>
      </td>
      <td className="table-y-middle py-7 min-width-px-170 pr-0">
        <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
          {candidate.created_at}
        </h3>
      </td>
      <td className="table-y-middle py-7 min-width-px-110 pr-0">
        <div className="">
          <Link
            href="/dashboard-applicants/[userId]"
            as={`/dashboard-applicants/${candidate.id}`}
          >
            <a className="font-size-3 font-weight-bold text-blue text-uppercase">
              View
            </a>
          </Link>
        </div>
      </td>
    </tr>
  );
}
