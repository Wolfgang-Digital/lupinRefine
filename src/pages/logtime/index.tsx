/// THIS IS A DEMO PAGE NOT BEING USED AT THIS MOMENT.

import React, { useState, useCallback, useMemo } from "react";
import {
	Eventcalendar,
	Draggable,
	Popup,
	Input,
	Textarea,
	Select,
	setOptions,
	Toast,
	MbscEventcalendarView,
	localeEnGB,
	MbscEventCreatedEvent,
	MbscCalendarEvent,
} from "@mobiscroll/react";

import "@mobiscroll/react/dist/css/mobiscroll.min.css";

setOptions({
	locale: localeEnGB,
	theme: "ios",
	themeVariant: "light",
});

const tasks = [
	{
		title: "Aura Leisure:Google Ads",
		color: "#02786D",
		start: "08:00",
		end: "10:00",
		length: "2 h",
	},
	{
		title: "Bodyslims:Google Ads",
		color: "#02786D",
		start: "08:00",
		end: "09:30",
		length: "1.5 h",
	},
	{
		title: "Breast Cancer Ireland:Analytics",
		color: "#02786D",
		start: "08:00",
		end: "10:00",
		length: "2 h",
	},
	{
		title: "Bygge Bo Ltd:Project management",
		color: "#02786D",
		start: "08:00",
		end: "10:00",
		length: "2 h",
	},
	{
		title: "Camile Thai:Social - Implementation",
		color: "#02786D",
		start: "08:00",
		end: "10:30",
		length: "2.5 h",
	},
	{
		title: "Caseys Furniture:Google Ads",
		color: "#02786D",
		start: "08:00",
		end: "12:30",
		length: "4.5 h",
	},
];

type DataType = { value: string; text: string };
const myData: DataType[] = [
	{ value: "1", text: "Client Meetings" },
	{ value: "2", text: "Analytics" },
	{ value: "3", text: "OPT" },
	{ value: "4", text: "CRO" },
	{ value: "5", text: "Auditing" },
	{ value: "6", text: "Comms" },
	{ value: "7", text: "Insights" },
];

interface TaskProps {
	data: {
		title: string;
		color: string;
		length: string;
	};
}

function Task(props: TaskProps) {
	const [draggable, setDraggable] = useState<HTMLElement | null>(null);

	const setDragElm = useCallback((elm: HTMLElement | null) => {
		setDraggable(elm);
	}, []);

	return (
		<div
			ref={setDragElm}
			style={{ background: props.data.color }}
			className="external-event-task"
		>
			<div>{props.data.title}</div>
			<div>{props.data.length}</div>
			<Draggable dragData={props.data} element={draggable} />
		</div>
	);
}

const MyCalendarComponent: React.FC = () => {
	const [isOpen, setOpen] = useState<boolean>(false);
	const [title, setTitle] = useState<string>("");
	const [details /*setDetails*/] = useState<string>("");
	const [technician, setTechnician] = useState<string>("");
	const [selectedText, setSelectedText] = useState<string>(""); // Added state for selected text
	const [anchor, setAnchor] = useState<HTMLElement | undefined>(undefined); // Updated type
	const [isToastOpen, setToastOpen] = useState<boolean>(false);
	const [toastText, setToastText] = useState<string | undefined>();

	const view = useMemo<MbscEventcalendarView>(() => {
		return {
			schedule: {
				type: "week",
				allDay: false,
				startTime: "06:00",
				endTime: "20:00",
			},
		};
	}, []);

	const invalid = useMemo(() => {
		return [
			{
				recurring: {
					repeat: "weekly",
					weekDays: "SA,SU",
				},
			},
			{
				start: "13:00",
				end: "14:00",
				title: "Lunch Break",
				recurring: {
					repeat: "weekly",
					weekDays: "MO,TU,WE,TH,FR",
				},
			},
		];
	}, []);

	const fillDialog = useCallback((args: MbscCalendarEvent) => {
		setTitle(args.event.title);
		setSelectedText(args.event.title);
		// Update anchor state based on the target value
		if (args.target) {
			setAnchor(args.target);
		}

		setOpen(true);
	}, []);

	const onEventCreated = useCallback(
		(args: MbscEventCreatedEvent) => {
			fillDialog(args);
		},
		[fillDialog]
	);

	const eventCreateFail = useCallback(() => {
		setToastText("Can't create event on this date");
		setToastOpen(true);
	}, []);

	const eventUpdateFail = useCallback(() => {
		setToastText("Can't add event on this date");
		setToastOpen(true);
	}, []);

	const onClose = useCallback(() => {
		setOpen(false);
		setToastText("New task added");
		setToastOpen(true);
	}, []);

	// const changeSelected = useCallback((event: MbscCalendarEvent) => {
	// 	setTechnician(event.value);
	// }, []);

	const closeToast = useCallback(() => {
		setToastOpen(false);
	}, []);

	return (
		<div className="mbsc-grid mbsc-no-padding">
			<div className="mbsc-row">
				<div className="mbsc-col-sm-3">
					<div className="mbsc-form-group-title">Allocated Tasks</div>
					{tasks.map((task, i) => (
						<Task key={i} data={task} />
					))}
				</div>
				<div className="mbsc-col-sm-9 external-event-calendar">
					<Eventcalendar
						view={view}
						invalid={invalid}
						dragToMove={true}
						externalDrop={true}
						onEventCreated={onEventCreated}
						onEventCreateFailed={eventCreateFail}
						onEventUpdateFailed={eventUpdateFail}
					/>
				</div>
				<Popup
					display="anchored"
					width={500}
					contentPadding={false}
					touchUi={false}
					headerText="Log Time"
					buttons={["ok"]}
					anchor={anchor}
					isOpen={isOpen}
					onClose={onClose}
				>
					<div className="mbsc-form-group">
						<Input label="Job" defaultValue={title} readOnly></Input>
						<Textarea
							label="Details"
							defaultValue={details}
							placeholder="Add description..."
						></Textarea>
						<Select
							data={myData}
							value={technician}
							onChange={(event: DataType) => {
								setTechnician(event.value);
								setSelectedText(event.text); // Set selected text
							}}
							display="anchored"
							touchUi={false}
							label="Task"
							inputProps={{ placeholder: "Please select..." }}
						/>
					</div>
				</Popup>
			</div>
			<Toast
				theme="ios"
				themeVariant="light"
				message={toastText}
				isOpen={isToastOpen}
				onClose={closeToast}
			/>
		</div>
	);
};

export default MyCalendarComponent;
