import type { ColumnDef } from "@tanstack/react-table";

import StatusBadge from "../custom/StatusBadge";
import { convertFileToUrl, formatDateTime } from "@/lib/utils";
import AppointmentModal from "../custom/AppointmentModal";
import type { Appointment } from "@/types/types";



export const getColumns = (doctors: CreateDoctorParams[]): ColumnDef<Appointment>[] => [
  {
    header: "ID",
    cell: ({ row }) => <p className="text-sm">{row.index + 1}</p>,
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => (
      <p className="text-sm">{row.original.patient?.fullName}</p>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <p className="text-sm">
        {formatDateTime(row.original.schedule)?.dateTime}
      </p>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return <StatusBadge status={row.original.status} className="shadow-md w-[100px]" />;
    },
  },
  {
    accessorKey: "doctor",
    header: "Doctor",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-1">
          {doctors.map((doctor) => {
            return doctor.fullName === row.original.primaryPhysician ? (<img className="border border-primary-text/70 rounded-full" key={doctor.fullName} src={Array.isArray(doctor.profileImage) ? convertFileToUrl(doctor.profileImage[0]) : doctor.profileImage} alt={doctor.fullName} width={30} height={30} />) : ("")
          })}
          <p className="text-sm text-primary-text">{row.original.primaryPhysician}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row: { original: data } }) => {
      return (
        <div onClick={(e) => e.stopPropagation()} className="flex items-center gap-3 justify-center">
            <AppointmentModal type="schedule" title="Schedule appointment" description="Please fill in the following details to continue" appointment={data} userId={data.userId} patientId={data.patient?._id} />
            <AppointmentModal type="cancel" title="Cancel appointment" description="Are you sure you want to cancel this appointment" appointment={data} userId={data.userId} patientId={data.patient?._id} />
        </div>
      );
    },
  },
];
