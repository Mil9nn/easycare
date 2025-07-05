import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { useAdminStore } from "@/hooks/useAdminStore";

const PassKeyModal = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(true);
  const [passkey, setPassKey] = useState("");
  const [error, setError] = useState("");

  const { verifyAdminOtp } = useAdminStore();

  const validatePassKey = async ( e: React.MouseEvent<HTMLButtonElement, MouseEvent> ) => {
    e.preventDefault();
    setError("");

    if (passkey.length !== 6) {
        setError("Passkey must be 6 digits long.");
        return;
    }

    try {
        await verifyAdminOtp(passkey, navigate);
        setOpen(false);
    } catch (error) {
        setError("Invalid passkey. Please try again.");
        console.error("Error verifying passkey:", error);
        setPassKey('');
    }
  };

  const closeModal = () => {
    setOpen(false);
    navigate("/");
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center text-btn-secondary justify-between">
            Admin access verification
            <X className="cursor-pointer" onClick={closeModal} />
          </AlertDialogTitle>
          <AlertDialogDescription>
            To access the admin panel, please verify your identity using a
            passkey.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <InputOTP
            maxLength={6}
            value={passkey}
            onChange={(value) => setPassKey(value)}
          >
            <InputOTPGroup className="shad-otp">
              <InputOTPSlot className="shad-otp-slot" index={0} />
              <InputOTPSlot className="shad-otp-slot" index={1} />
              <InputOTPSlot className="shad-otp-slot" index={2} />
              <InputOTPSlot className="shad-otp-slot" index={3} />
              <InputOTPSlot className="shad-otp-slot" index={4} />
              <InputOTPSlot className="shad-otp-slot" index={5} />
            </InputOTPGroup>
          </InputOTP>

          <p className="shad-error text-regular-14 flex items-center">
            {error}
          </p>
        </div>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={(e) => validatePassKey(e)}
            className="submit-btn"
          >
            Enter Admin Passkey
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PassKeyModal;
