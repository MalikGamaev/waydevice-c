import type { Device } from "../device/types";

export interface DeviceProps {
	show: boolean;
	onHide: () => void;
	titleModal: string;
	currentDevice?: Device | null;
}

export interface InfoItem {
  title: string;
  description: string;
  number: number;
}

export interface Params {
	id: number
}