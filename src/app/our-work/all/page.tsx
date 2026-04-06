import Link from "next/link";
import { redirect } from "next/navigation";

// Redirect /our-work/all to /our-work for simplicity
export default function AllWorkPage() {
  redirect("/our-work");
}
