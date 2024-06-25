"use client";
import { Prelisting } from "@prisma/client";

import styles from "./PrelistingItem.module.css";
import {
  IoArrowUndo,
  IoCheckboxOutline,
  IoPencil,
  IoSearch,
  IoSquareOutline,
} from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PopUpLink from "../popup/PopUp";
import { SpinnerDotted } from "spinners-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Props {
  prelisting: Prelisting;
  togglePrelisting: (
    id: string,
    complete: boolean
  ) => Promise<Prelisting | void>;
}

const PrelistingItem = ({ prelisting, togglePrelisting }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showFeedAlert, setShowFeedAlert] = useState(false);
  const handleAlertAction = () => {
    setShowAlert(false);

    router.push("/dashboard/form");
  };
  const handleFeedAlertAction = () => {
    setShowFeedAlert(false);

    router.push("/dashboard/feedback");
  };

  const handleClick = async () => {
    localStorage.setItem("prelistingId", prelisting.id);
    setLoading(true);
    const formId = prelisting.id;

    try {
      const response = await fetch(`/api/checkFormExistance/${formId}`);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      console.log("%c Line:33 🍑 data", "color:#465975", data);

      if (data.exists && String(data.form?.prelistingId) === String(formId)) {
        setShowAlert(true);
      } else {
        router.push("/dashboard/newFormPage");
      }
    } catch (error) {
      console.error("Error checking form existence:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleClickFeedback = async () => {
    localStorage.setItem("feedBackId", prelisting.id);
    setLoading(true);
    const feedBackId = prelisting.id;
    console.log("%c Line:62 🎂 feedBackId", "color:#e41a6a", feedBackId);

    try {
      const response = await fetch(`/api/feedback/${feedBackId}`);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      console.log("%c Line:73 🍿 data", "color:#465975", data);
      console.log("feedBackId:", feedBackId);
      console.log("data.form.prelistingId:", data.form?.prelistingId);

      if (
        data.exists &&
        String(data.form?.prelistingId) === String(feedBackId)
      ) {
        setShowFeedAlert(true);
      } else {
        router.push("/dashboard/newFeedback");
      }
    } catch (error) {
      console.error("Error checking form existence:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleClickSearch = async () => {
    localStorage.setItem("prelistingId", prelisting.id);
    setLoading(true);
    try {
      router.push("/dashboard/meli");
    } catch (error) {
      console.error("Error checking form existence:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {showAlert && (
        <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Heads up!</AlertDialogTitle>
              <AlertDialogDescription>
                Ya Existe un prelisting para esta propiedad!
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={handleAlertAction}>
                Ok
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      {showFeedAlert && (
        <AlertDialog open={showFeedAlert} onOpenChange={setShowFeedAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Heads up!</AlertDialogTitle>
              <AlertDialogDescription>
                Ya Existe un feedBack para esta propiedad!
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={handleFeedAlertAction}>
                Ok
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      <div
        className={
          prelisting.complete ? styles.prelistingDone : styles.prelistingPending
        }
        style={{ position: "relative" }}
      >
        <div className="flex flex-col sm:flex-row justify-start items-center  ">
          <PopUpLink
            href={"#"}
            description={"Prelisting"}
            position="absolute bottom-8 right-4"
            onClick={handleClick}
          >
            <IoPencil
              className="absolute bottom-2 right-2 cursor-pointer hover:bg-opacity-60"
              color="brown"
              size={20}
            />
          </PopUpLink>
          <PopUpLink
            href={"#"}
            description={"Feedback"}
            position="absolute top-2 right-8"
          >
            <IoArrowUndo
              className=" absolute top-2 right-2 cursor-pointer hover:bg-opacity-60"
              color="brown"
              size={20}
              onClick={handleClickFeedback}
            />
          </PopUpLink>
          <PopUpLink
            href={"/dashboard/meli"}
            description={"Meli"}
            position="absolute top-10 right-8"
          >
            <IoSearch
              className="absolute top-10 right-2 cursor-pointer hover:bg-opacity-60"
              color="gray"
              size={20}
              onClick={handleClickSearch}
            />
          </PopUpLink>
          <div
            onClick={() =>
              togglePrelisting(prelisting.id, !prelisting.complete)
            }
            className={`flex p-2 rounded-md hover:bg-opacity-60 ${
              prelisting.complete ? "bg-blue-100" : "bg-yellow-300"
            }`}
          >
            {prelisting.complete ? (
              <IoCheckboxOutline size={30} />
            ) : (
              <IoSquareOutline size={30} />
            )}
          </div>

          <div className="text-center sm:text-left text-blue-900 p-2">
            <strong>Nombre de la Propriedad:</strong> {prelisting.description}
            <hr />
            <strong>Operación:</strong> {prelisting.title}
          </div>
        </div>

        {loading && (
          <SpinnerDotted
            size={50}
            thickness={100}
            speed={100}
            color="rgba(172, 125, 57, 1)"
          />
        )}
      </div>
    </>
  );
};

export default PrelistingItem;
