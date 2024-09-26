import { DialogOverlay } from "@reach/dialog";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import MotionDialogContent from "../modal/MotionDialogContent";

function PrimaryModal({
  className = "",
  children = null,
  body = null,
  classNameWrapper = "",
  showModalDialog,
  setShowModalDialog,
}) {
  return (
    <div className={`${className}`}>
      <div className="w-full" onClick={() => setShowModalDialog(true)}>
        {children}
      </div>
      <AnimatePresence>
        {showModalDialog && (
          <DialogOverlay
            onDismiss={() => setShowModalDialog(false)}
            className="z-50 flex items-center justify-center"
          >
            {/* @ts-ignore */}
            <MotionDialogContent
              aria-label="Modal popup"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{
                opacity: 0,
                y: 200,
                transition: {
                  duration: 0.15,
                },
              }}
              className={`z-50 min-w-[343px] md:min-w-[392px] !bg-transparent ${classNameWrapper}`}
            >
              <motion.div
                className="flex flex-col rounded-lg bg-background shadow-primary-color"
                initial={{ y: +30 }}
                animate={{ y: 0 }}
              >
                {body}
              </motion.div>
            </MotionDialogContent>
          </DialogOverlay>
        )}
      </AnimatePresence>
    </div>
  );
}

export default PrimaryModal;
