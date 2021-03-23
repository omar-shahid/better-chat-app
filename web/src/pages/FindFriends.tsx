import React from "react";
import { useQuery } from "react-query";
import { api } from "../api";
import MainLayout from "../layouts/Main";

interface Props {}

const FindFriendsPage: React.FC<Props> = () => {
  const { data } = useQuery("findFriends", api.user.findFriends);
  console.log("data", data);
  return (
    <MainLayout title="Find Friends">
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="m-10 overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Name
                    </th>

                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Send Request Colomn</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data?.map((user) => (
                    <tr key={user._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10">
                            <img
                              className="w-10 h-10 rounded-full"
                              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.name}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                        <button className="p-3 text-green-100 bg-green-500 hover:bg-green-700">
                          Send Request
                        </button>
                      </td>
                    </tr>
                  ))}
                  {/* More items... */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
export default FindFriendsPage;
