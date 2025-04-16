import React from "react";

const MembersTable = ({ members }) => {
  return (
    <div className="overflow-x-auto mt-10">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="w-1/4 py-2 px-4 border-b border-gray-300">Sr.No.</th>
            <th className="w-1/4 py-2 px-4 border-b border-gray-300">Name</th>
            <th className="w-1/4 py-2 px-4 border-b border-gray-300">Email</th>
            <th className="w-1/4 py-2 px-4 border-b border-gray-300">Role</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b border-gray-300 text-center">
                {index + 1}
              </td>
              <td className="py-2 px-4 border-b border-gray-300 text-center">
                {member.name}
              </td>
              <td className="py-2 px-4 border-b border-gray-300 text-center">
                {member.email}
              </td>
              <td className="py-2 px-4 border-b border-gray-300 text-center">
                {member.role}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MembersTable;
