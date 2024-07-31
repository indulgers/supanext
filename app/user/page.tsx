'use client';
import React, { useState, useMemo, useCallback, useEffect } from "react";
import { createClient } from '@/utils/supabase/client';
import type { SupabaseClient } from '@supabase/supabase-js';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  SharedSelection,
  useDisclosure,
  ModalContent,
  Select,
  SelectItem
} from "@nextui-org/react";
import { PlusIcon } from "../../components/icons/PlusIcon";
import { VerticalDotsIcon } from "../../components/icons/VerticalDotsIcon";
import { SearchIcon } from "../../components/icons/SearchIcon";
import { ChevronDownIcon } from "../../components/icons/ChevronDownIcon";
import { columns, statusOptions } from "./data";
import { capitalize } from "../../utils/supabase/capitalize";

type UserType = {
  id: string;
  name: string;
  age: string;
  email: string;
  status: string;
  avatar?: string;
  team?: string;
};

type SortDescriptor = {
  column: string;
  direction: "ascending" | "descending";
};

const statusColorMap: Record<string, string> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["name", "role", "status", "actions"];

export default function Page() {
  const [filterValue, setFilterValue] = useState<string>("");
  const [users, setUsers] = useState<UserType[]>([]);
  const [newUser, setNewUser] = useState<Omit<UserType, 'id'>>({ name: '', age: '', email: '', status: '' });
  const [selectedKeys, setSelectedKeys] = useState<Set<React.Key>>(new Set());
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = useState<string | "all">("all");
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = useState<number>(1);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const supabase: SupabaseClient = createClient();

  const hasSearchFilter = Boolean(filterValue);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const { data, error } = await supabase.from('users').select();
    if (error) {
      console.error(error);
    } else {
      setUsers(data as UserType[]);
    }
  }

  async function createUser() {
    const { data, error } = await supabase.from('users').insert([newUser]) as unknown as { data: UserType[], error: Error };
    if (error) {
      console.error(error);
    } else {
      if (data && data.length > 0) {
        fetchUsers(); // 重新获取用户数据
      }
      setNewUser({ name: '', age: '', email: '', status: '' });
    }
  }

  async function deleteUser(id: string) {
    const { error } = await supabase.from('users').delete().match({ id });
    if (error) {
      console.error(error);
    } else {
      fetchUsers(); // 重新获取用户数据
    }
  }

  async function updateUser(id: string, updatedUser: Partial<UserType>) {
    const { data, error } = await supabase.from('users').update(updatedUser).match({ id });
    if (error) {
      console.error(error);
    } else {
      fetchUsers(); // 重新获取用户数据
    }
  }

  const headerColumns = useMemo(() => {
    if (visibleColumns.size === columns.length) return columns;
    return columns.filter((column) => visibleColumns.has(column.uid));
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredUsers = [...users];
    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.status),
      );
    }
    return filteredUsers;
  }, [users, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof UserType] ?? ''; // Add nullish coalescing operator
      const second = b[sortDescriptor.column as keyof UserType] ?? ''; 
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback((user: UserType, columnKey: string) => {
    const cellValue = user[columnKey as keyof UserType];
    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            description={user.email}
            name={cellValue as string}
          >
            {user.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue as string}</p>
            <p className="text-bold text-tiny capitalize text-default-400">{user.team}</p>
          </div>
        );
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[user.status] as "success" | "danger" | "warning" | "default" | "primary" | "secondary" | undefined} size="sm" variant="flat">
            {cellValue as string}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem onClick={() => updateUser(user.id, { status: 'active' })}>Activate</DropdownItem>
                <DropdownItem onClick={() => updateUser(user.id, { status: 'paused' })}>Pause</DropdownItem>
                <DropdownItem onClick={() => deleteUser(user.id)}>Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue as string;
    }
  }, []);

  const onRowsPerPageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = useCallback((value: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={onClear}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={(keys: SharedSelection) => setStatusFilter(keys as string)}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid}>{status.name}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button color="primary"  endContent={<PlusIcon />} onPress={() => onOpenChange()}>
              New user
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <p className="whitespace-nowrap text-default-400 text-small">Show:</p>
          <select className="max-w-full sm:max-w-[7rem] text-small rounded-large px-3 py-1" onChange={onRowsPerPageChange}>
            <option value={5}>5 rows</option>
            <option value={10}>10 rows</option>
            <option value={15}>15 rows</option>
            <option value={20}>20 rows</option>
          </select>
        </div>
      </div>
    );
  }, [filterValue, statusFilter, onClear, onSearchChange, onRowsPerPageChange, onOpenChange]);

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="w-full flex justify-center">
        <div className="w-full h-[450px]">
          <Table
            aria-label="User list table"
            sortDescriptor={sortDescriptor}
            topContent={topContent}
            bottomContent={
              <div className="py-2 px-2 flex justify-between">
                <Pagination
                  showControls
                  showShadow
                  isCompact
                  page={page}
                  total={pages}
                  onChange={(page) => setPage(page)}
                />
              </div>
            }
            selectedKeys={
              Array.from(selectedKeys).map((key) => key.toString())
            }
            onSelectionChange={(keys) => setSelectedKeys(new Set(keys))}
            onSortChange={
              (column) => {
                if (sortDescriptor.column === column.column) {
                  setSortDescriptor({
                    column: column.column?.toString() || "", // Convert column.column to string
                    direction: sortDescriptor.direction === "ascending" ? "descending" : "ascending",
                  });
                } else {
                  setSortDescriptor({ column: column.column?.toString() || "", direction: "ascending" }); // Convert column.column to string
                }
              }
            }
          >
            <TableHeader columns={headerColumns}>
              {(column) => (
                <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"} allowsSorting>
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={sortedItems}>
              {(user) => (
                <TableRow key={user.id}>
                  {(columnKey) => (
                    <TableCell>{renderCell(user, columnKey.toString())}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent className="bg-white">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add User</ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-3">
                  <Input
                    fullWidth
                    label="Name"
                    placeholder="Enter your name"
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  />
                  <Input
                    fullWidth
                    label="Age"
                    placeholder="Enter your age"
                    onChange={(e) => setNewUser({ ...newUser, age: e.target.value })}
                  />
                  <Input
                    fullWidth
                    label="Email"
                    placeholder="Enter your email"
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  />
                  <Select
                    fullWidth
                    label="Status"
                    placeholder="Select status"
                    onChange={(event) => setNewUser({ ...newUser, status: event.target.value.toString() })}
                  >
                    {statusOptions.map((status) => (
                      <SelectItem key={status.uid} value={status.uid}>
                        {capitalize(status.name)}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={createUser}>
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

