export interface CreateProps {
	show: boolean;
	onHide: () => void
}

export interface InfoItem {
  title: string;
  description: string;
  number: number;
}

export interface Params {
	id: number
}