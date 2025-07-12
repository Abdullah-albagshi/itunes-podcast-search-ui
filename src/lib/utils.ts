import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function MillisToHoursMinutes(millis: number) {
	const hours = Math.floor(millis / 3600000);
	const minutes = Math.floor((millis % 3600000) / 60000);
	if (hours > 0) {
		return `${hours}h ${minutes}min`;
	}
	return `${minutes}m`;
}