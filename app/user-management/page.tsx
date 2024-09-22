// @/app/user-management/page.tsx
"use client";

import { useEffect, useState } from "react";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Spinner,
  Card,
  CardHeader,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  ModalContent,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { toast } from "sonner";

import { CiWarning } from "react-icons/ci";

interface User {
  id: string;
  name: string;
  role: string;
  division: { name: string };
  account: { email: string; accountVerified: boolean };
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedUserForRole, setSelectedUserForRole] = useState<User | null>(
    null
  );
  const [newRole, setNewRole] = useState<string>("");

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isOpen: isRoleModalOpen, onOpenChange: onRoleModalOpenChange } =
    useDisclosure();

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/get-users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();

          const sortedUsers = data.sort((a: User, b: User) =>
            a.account.accountVerified === b.account.accountVerified
              ? 0
              : a.account.accountVerified
              ? 1
              : -1
          );

          setUsers(sortedUsers);
        } else {
          const errorData = await response.json();
          setError(errorData.error || "Failed to fetch users.");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("An unexpected error occurred while fetching users.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  async function setAccountVerified(userId: string) {
    try {
      const response = await fetch("/api/verify-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        const data = await response.json();
        toast(`${data?.account?.email} has been successfully verified.`);
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId
              ? { ...user, account: { ...user.account, accountVerified: true } }
              : user
          )
        );
      } else {
        const errorData = await response.json();
        toast(`Failed to verify account: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error verifying account:", error);
      toast("An unexpected error occurred while verifying account.");
    }
  }

  async function setUserRole(userId: string, newRole: string) {
    try {
      const response = await fetch("/api/update-user-role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, role: newRole }),
      });

      if (response.ok) {
        const data = await response.json();
        toast(
          `${data?.user?.account?.email} role has been updated to ${newRole}`
        );
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, role: newRole } : user
          )
        );
      } else {
        const errorData = await response.json();
        toast(`Failed to update role: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error updating user role:", error);
      toast("An unexpected error occurred while updating role.");
    }
  }

  return (
    <main className="h-full w-full flex flex-col justify-center items-center my-12 text-neutral-50">
      <Card radius="sm" className="w-11/12 md:w-1/2 mx-auto">
        <CardHeader className="justify-center">
          <h2 className="text-xl font-bold">User Management</h2>
        </CardHeader>
        <CardBody>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Spinner size="lg" />
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <CiWarning className="h-12 w-12 text-danger mb-4" />
              <p className="text-lg text-danger">{error}</p>
            </div>
          ) : users.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <p className="text-lg text-default-500">No users found.</p>
            </div>
          ) : (
            <Table
              aria-label="User Management"
              shadow="none"
              selectionMode="none"
              classNames={{ base: "overflow-visible" }}
            >
              <TableHeader>
                <TableColumn>ID</TableColumn>
                <TableColumn>Name</TableColumn>
                <TableColumn>Email</TableColumn>
                <TableColumn>Role</TableColumn>
                <TableColumn>Division</TableColumn>
                <TableColumn>Account Verified</TableColumn>
                <TableColumn>Actions</TableColumn>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.account?.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      {user.division ? user.division.name : "N/A"}
                    </TableCell>
                    <TableCell>
                      {user.account.accountVerified ? (
                        <span>Already Verified</span>
                      ) : (
                        <Button
                          color="primary"
                          onClick={() => setSelectedUser(user)}
                          onPress={onOpen}
                        >
                          Verify Account
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        color="secondary"
                        onClick={() => {
                          setSelectedUserForRole(user);
                          onRoleModalOpenChange();
                        }}
                      >
                        Change Role
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardBody>
      </Card>
      {/* Modal for verifying account */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <h2 className="text-lg font-bold">Confirmation</h2>
              </ModalHeader>
              <ModalBody>
                <p>
                  Are you sure you want to verify the account of{" "}
                  {selectedUser?.name}?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  onClick={async () => {
                    if (selectedUser) {
                      await setAccountVerified(selectedUser.id);
                      onClose();
                    }
                  }}
                >
                  Confirm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Modal for changing user role */}
      <Modal isOpen={isRoleModalOpen} onOpenChange={onRoleModalOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <h2 className="text-lg font-bold">Change User Role</h2>
              </ModalHeader>
              <ModalBody>
                <Select
                  placeholder="Select new role"
                  // value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                >
                  <SelectItem key={"admin"} value="admin">
                    Admin
                  </SelectItem>
                  <SelectItem key={"moderator"} value="moderator">
                    Moderator
                  </SelectItem>
                  <SelectItem key={"user"} value="user">
                    User
                  </SelectItem>
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  onClick={async () => {
                    if (selectedUserForRole && newRole) {
                      await setUserRole(selectedUserForRole.id, newRole);
                      onClose();
                    }
                  }}
                >
                  Confirm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </main>
  );
}
