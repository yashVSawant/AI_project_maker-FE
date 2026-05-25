import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllInvites, acceptInvite, rejectInvite } from "./api";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../../wrappers/PageWrapper";

const InviteListPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["my-invites"],
    queryFn: getAllInvites,
  });

  const { mutate: acceptMutate } = useMutation({
    mutationFn: acceptInvite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-invites"] });
    },
  });

  const { mutate: rejectMutate } = useMutation({
    mutationFn: rejectInvite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-invites"] });
    },
  });

  const invites = data?.data || [];

  // 🔄 Loading
  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-gray-300 border-t-black rounded-full"></div>
      </div>
    );
  }

  // 📭 Empty state
  if (!invites.length) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-gray-500">No invites yet</p>
      </div>
    );
  }

  return (
    <PageWrapper title="My Invites" showBack={false}>
    <div className="w-full h-full p-3">
      {/* <h2 className="text-2xl font-semibold mb-6">My Invites</h2> */}

      <div className="space-y-4">
        {invites.map((invite: any) => {
          const isExpired = new Date(invite.expiresAt) < new Date();

          return (
            <div
              key={invite.id}
              className="bg-white p-5 rounded-xl shadow-sm border border-primary flex justify-between items-center"
            >
              {/* Left */}
              <div>
                <h3 className="font-semibold text-lg">
                  {invite.project.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {invite.project.description}
                </p>

                <div className="flex gap-2 mt-2">
                    
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded-full">
                    Role : {invite.role}
                  </span>

                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      invite.status === "ACCEPTED"
                        ? "bg-green-100 text-green-600"
                        : invite.status === "REJECTED"
                        ? "bg-red-100 text-red-600"
                        : isExpired
                        ? "bg-gray-200 text-gray-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                   Status :  {isExpired ? "EXPIRED" : invite.status}
                  </span>

                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded-full">
                    Invited By : {invite.invitedBy?.name}
                  </span>
                </div>
              </div>

              {/* Right */}
              <div className="flex gap-2">
                {invite.status === "PENDING" && !isExpired && (
                  <>
                    <button
                      onClick={() => acceptMutate(invite.id)}
                      className="px-4 py-2 bg-black text-white rounded-lg text-sm"
                    >
                      Accept
                    </button>

                    <button
                      onClick={() => rejectMutate(invite.id)}
                      className="px-4 py-2 border rounded-lg text-sm"
                    >
                      Reject
                    </button>
                  </>
                )}

            
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </PageWrapper>
  );
};

export default InviteListPage;