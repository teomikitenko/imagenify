"use client";
import React from "react";
import { useToast } from "./ui/use-toast";
import { useEffect } from "react";

const ShowToast = ({credits}:{credits:string}) => {
  const { toast } = useToast();
 useEffect(()=>{
    toast({
        variant:'default',
        title: "You succefully buy credits!",
        description: `${credits} credits has been added to you account`,
      })
},[]) 
  return <></>;
};

export default ShowToast;
