import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import ArrowDownIcon from "../icons/ArrowDownIcon";

function SelectPageSizeDropDown({ setPageSize, pageSize, listPageSize }) {
  const pageSizeNode = useRef();
  const [isOpenPagesize, toggleOpen] = useState(false);

  const toggleOpenMenuPagesize = () => {
    toggleOpen(!isOpenPagesize);
  };

  const handleClickOutsidePagesize = (e) => {
    // @ts-ignore
    if (pageSizeNode.current?.contains(e.target)) {
      return;
    }
    toggleOpen(false);
  };

  useEffect(() => {
    if (isOpenPagesize) {
      document.addEventListener("mousedown", handleClickOutsidePagesize);
    } else {
      document.removeEventListener("mousedown", handleClickOutsidePagesize);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutsidePagesize);
    };
  }, [isOpenPagesize]);

  const subMenuAnimatePagesize = {
    enter: {
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.5,
      },
      display: "block",
    },
    exit: {
      opacity: 0,
      rotateX: 15,
      transition: {
        duration: 0.2,
        delay: 0.05,
      },
      transitionEnd: {
        display: "none",
      },
    },
  };

  return (
    <motion.div className="relative">
      <div
        ref={pageSizeNode}
        onClick={toggleOpenMenuPagesize}
        className="flex items-center justify-between h-8 gap-1 px-2 border rounded cursor-pointer border-secondary hover:border-primary"
      >
        <div className="flex items-center gap-1 min-w-[74px]">
          <p className="text-sm text-white">{pageSize}</p>
        </div>
        <div className={`${isOpenPagesize && "rotate-180"} smooth-transform`}>
          <ArrowDownIcon />
        </div>
      </div>

      <motion.div
        initial="exit"
        animate={isOpenPagesize ? "enter" : "exit"}
        variants={subMenuAnimatePagesize}
        className={`absolute right-0 bottom-[100%] w-full`}
        style={{
          borderRadius: 5,
          backgroundColor: "transparent",
          transformOrigin: "50% -30px",
          zIndex: 10,
        }}
      >
        <div className="z-50 flex flex-col w-full min-w-full gap-3 py-3 mb-1 border rounded-lg shadow-md smooth-transform bg-subBg border-secondary">
          {listPageSize
            .sort((a, b) => b - a)
            .map((i, index) => (
              <div
                onClick={() => setPageSize(i)}
                key={index}
                className="w-full px-4 py-2 text-white cursor-pointer bg-opacity-20 hover:bg-[#ffffff10] hover:text-primary smooth-transform"
              >
                {i}
              </div>
            ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default SelectPageSizeDropDown;
