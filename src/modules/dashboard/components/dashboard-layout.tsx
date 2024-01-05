import { useState } from "react";
import { Tabs, Tab } from "@mui/material"
import { DataGrid, FlexBox } from "lib/ui-ux"
import { createColumnHelper } from "@tanstack/react-table";
import styled from "styled-components";

interface IAgentPerformanceProductivity {
    agentName: string;
    employeeQueueName: string;
    avgFirstResponseTime: string;
    avgResolutionTime: string;
    avgHandlingTime: string;
    activeTime: string;
    breakTime: string
    totalLogin: string;
}

const data = [{ "agentName": "Jan Raffles", "employeeQueueName": "Finance AP", "avgFirstResponseTime": "12:49 PM", "avgResolutionTime": "8:00 PM", "avgHandlingTime": "2:41 PM", "activeTime": "8:11 AM", "breakTime": "4:45 AM", "totalLogin": "12:46 AM" },
{ "agentName": "Aline Dudman", "employeeQueueName": "Legal", "avgFirstResponseTime": "5:19 AM", "avgResolutionTime": "4:34 PM", "avgHandlingTime": "3:21 AM", "activeTime": "6:14 PM", "breakTime": "12:25 PM", "totalLogin": "6:26 PM" },
{ "agentName": "Marney Kibbey", "employeeQueueName": "HRGA", "avgFirstResponseTime": "2:53 PM", "avgResolutionTime": "5:00 AM", "avgHandlingTime": "11:53 PM", "activeTime": "6:05 PM", "breakTime": "10:41 AM", "totalLogin": "2:35 PM" },
{ "agentName": "Laurianne Dillicate", "employeeQueueName": "Finance AR", "avgFirstResponseTime": "4:43 AM", "avgResolutionTime": "4:09 AM", "avgHandlingTime": "12:00 PM", "activeTime": "1:50 PM", "breakTime": "7:33 AM", "totalLogin": "12:57 AM" },
{ "agentName": "Ethelin Bowcher", "employeeQueueName": "Finance AR", "avgFirstResponseTime": "7:57 PM", "avgResolutionTime": "6:08 AM", "avgHandlingTime": "10:48 AM", "activeTime": "2:40 AM", "breakTime": "1:06 PM", "totalLogin": "1:18 AM" },
{ "agentName": "Lorrie Floweth", "employeeQueueName": "HROps", "avgFirstResponseTime": "6:54 PM", "avgResolutionTime": "4:45 AM", "avgHandlingTime": "5:13 PM", "activeTime": "3:39 PM", "breakTime": "6:28 AM", "totalLogin": "8:47 PM" },
{ "agentName": "Jacklyn Bofield", "employeeQueueName": "Creative Marketing", "avgFirstResponseTime": "12:09 PM", "avgResolutionTime": "1:05 PM", "avgHandlingTime": "9:03 AM", "activeTime": "8:04 AM", "breakTime": "7:11 PM", "totalLogin": "6:45 PM" },
{ "agentName": "Cody Mattiato", "employeeQueueName": "Finance AR", "avgFirstResponseTime": "9:07 AM", "avgResolutionTime": "2:16 PM", "avgHandlingTime": "10:55 AM", "activeTime": "10:10 PM", "breakTime": "10:12 AM", "totalLogin": "12:09 PM" },
{ "agentName": "Mattie Alkin", "employeeQueueName": "HRGA", "avgFirstResponseTime": "6:38 PM", "avgResolutionTime": "9:07 AM", "avgHandlingTime": "8:21 AM", "activeTime": "7:57 AM", "breakTime": "8:34 PM", "totalLogin": "4:42 AM" },
{ "agentName": "Lenore Andrieu", "employeeQueueName": "HROps", "avgFirstResponseTime": "11:49 AM", "avgResolutionTime": "6:20 PM", "avgHandlingTime": "1:39 AM", "activeTime": "5:30 AM", "breakTime": "9:14 AM", "totalLogin": "4:32 AM" },
{ "agentName": "Myriam Stodd", "employeeQueueName": "Finance AR", "avgFirstResponseTime": "4:06 PM", "avgResolutionTime": "9:33 AM", "avgHandlingTime": "12:07 AM", "activeTime": "10:35 AM", "breakTime": "10:54 PM", "totalLogin": "4:24 PM" },
{ "agentName": "Galven Duckit", "employeeQueueName": "HROps", "avgFirstResponseTime": "11:10 AM", "avgResolutionTime": "8:58 AM", "avgHandlingTime": "1:13 AM", "activeTime": "3:18 AM", "breakTime": "12:02 PM", "totalLogin": "10:03 PM" },
{ "agentName": "Jerrilyn Tabram", "employeeQueueName": "HROps", "avgFirstResponseTime": "1:24 AM", "avgResolutionTime": "12:28 AM", "avgHandlingTime": "8:10 PM", "activeTime": "12:14 PM", "breakTime": "5:53 PM", "totalLogin": "4:14 AM" },
{ "agentName": "Nollie Divine", "employeeQueueName": "Legal", "avgFirstResponseTime": "12:41 AM", "avgResolutionTime": "10:44 AM", "avgHandlingTime": "4:29 PM", "activeTime": "4:32 AM", "breakTime": "3:58 PM", "totalLogin": "9:29 AM" },
{ "agentName": "Nonie Eldridge", "employeeQueueName": "Finance AR", "avgFirstResponseTime": "11:57 PM", "avgResolutionTime": "3:49 AM", "avgHandlingTime": "11:59 AM", "activeTime": "7:26 PM", "breakTime": "8:08 AM", "totalLogin": "3:53 AM" },
{ "agentName": "Olenka Arent", "employeeQueueName": "Finance AR", "avgFirstResponseTime": "8:20 AM", "avgResolutionTime": "8:37 AM", "avgHandlingTime": "6:16 PM", "activeTime": "12:57 PM", "breakTime": "12:59 AM", "totalLogin": "3:36 AM" },
{ "agentName": "Robinson Karslake", "employeeQueueName": "Finance AR", "avgFirstResponseTime": "4:28 PM", "avgResolutionTime": "3:33 AM", "avgHandlingTime": "3:45 PM", "activeTime": "11:24 AM", "breakTime": "9:20 AM", "totalLogin": "10:41 AM" },
{ "agentName": "Beryle Pardy", "employeeQueueName": "Finance AR", "avgFirstResponseTime": "10:56 AM", "avgResolutionTime": "2:59 PM", "avgHandlingTime": "8:12 AM", "activeTime": "9:36 AM", "breakTime": "2:34 PM", "totalLogin": "7:09 AM" },
{ "agentName": "Filip Whiteman", "employeeQueueName": "HRGA", "avgFirstResponseTime": "11:45 AM", "avgResolutionTime": "5:02 PM", "avgHandlingTime": "1:35 PM", "activeTime": "11:37 AM", "breakTime": "1:14 PM", "totalLogin": "1:17 AM" },
{ "agentName": "Phil Vaines", "employeeQueueName": "HROps", "avgFirstResponseTime": "2:01 PM", "avgResolutionTime": "5:44 AM", "avgHandlingTime": "2:10 AM", "activeTime": "2:26 PM", "breakTime": "6:24 AM", "totalLogin": "5:10 AM" },
{ "agentName": "Janeczka Pratten", "employeeQueueName": "Legal", "avgFirstResponseTime": "1:40 PM", "avgResolutionTime": "5:22 PM", "avgHandlingTime": "4:42 AM", "activeTime": "5:38 PM", "breakTime": "7:49 AM", "totalLogin": "8:24 PM" },
{ "agentName": "Mead Esley", "employeeQueueName": "Ticket flow for email", "avgFirstResponseTime": "11:45 PM", "avgResolutionTime": "7:10 AM", "avgHandlingTime": "2:34 AM", "activeTime": "4:53 AM", "breakTime": "12:54 AM", "totalLogin": "11:55 PM" },
{ "agentName": "Willette Dominichetti", "employeeQueueName": "Finance AR", "avgFirstResponseTime": "8:20 AM", "avgResolutionTime": "12:34 AM", "avgHandlingTime": "3:47 PM", "activeTime": "6:19 AM", "breakTime": "7:38 PM", "totalLogin": "11:47 AM" },
{ "agentName": "Delilah Visick", "employeeQueueName": "HRGA", "avgFirstResponseTime": "10:25 AM", "avgResolutionTime": "11:32 PM", "avgHandlingTime": "7:11 PM", "activeTime": "11:53 PM", "breakTime": "8:45 PM", "totalLogin": "1:17 PM" },
{ "agentName": "Opaline Gradley", "employeeQueueName": "Legal", "avgFirstResponseTime": "1:10 PM", "avgResolutionTime": "1:41 PM", "avgHandlingTime": "2:24 AM", "activeTime": "4:55 PM", "breakTime": "8:11 PM", "totalLogin": "7:56 AM" },
{ "agentName": "Maddie Rude", "employeeQueueName": "HRGA", "avgFirstResponseTime": "2:24 AM", "avgResolutionTime": "12:17 AM", "avgHandlingTime": "8:41 PM", "activeTime": "2:09 PM", "breakTime": "3:24 PM", "totalLogin": "3:25 AM" },
{ "agentName": "Bryant Ranner", "employeeQueueName": "Finance AP", "avgFirstResponseTime": "1:32 PM", "avgResolutionTime": "12:43 PM", "avgHandlingTime": "7:07 PM", "activeTime": "11:43 PM", "breakTime": "11:23 PM", "totalLogin": "2:27 AM" },
{ "agentName": "Minne Durrans", "employeeQueueName": "Finance AP", "avgFirstResponseTime": "7:34 AM", "avgResolutionTime": "1:18 AM", "avgHandlingTime": "9:42 PM", "activeTime": "4:14 AM", "breakTime": "10:44 AM", "totalLogin": "12:07 PM" },
{ "agentName": "Abigail Gabriely", "employeeQueueName": "Creative Marketing", "avgFirstResponseTime": "5:21 PM", "avgResolutionTime": "10:07 AM", "avgHandlingTime": "9:46 AM", "activeTime": "2:02 PM", "breakTime": "11:21 AM", "totalLogin": "3:05 PM" },
{ "agentName": "Albertina Harriot", "employeeQueueName": "Ticket flow for email", "avgFirstResponseTime": "10:53 PM", "avgResolutionTime": "8:43 AM", "avgHandlingTime": "10:31 AM", "activeTime": "5:48 PM", "breakTime": "1:13 PM", "totalLogin": "5:22 AM" },
{ "agentName": "Osborne Borleace", "employeeQueueName": "Legal", "avgFirstResponseTime": "4:17 AM", "avgResolutionTime": "1:53 PM", "avgHandlingTime": "6:38 AM", "activeTime": "8:58 AM", "breakTime": "4:39 PM", "totalLogin": "3:37 PM" },
{ "agentName": "Junina Kingscote", "employeeQueueName": "Finance AP", "avgFirstResponseTime": "10:40 AM", "avgResolutionTime": "12:12 PM", "avgHandlingTime": "2:23 AM", "activeTime": "6:17 PM", "breakTime": "10:53 AM", "totalLogin": "12:25 AM" },
{ "agentName": "Persis Scrivinor", "employeeQueueName": "Ticket flow for email", "avgFirstResponseTime": "10:15 PM", "avgResolutionTime": "8:14 AM", "avgHandlingTime": "1:46 PM", "activeTime": "12:51 PM", "breakTime": "12:45 PM", "totalLogin": "12:13 PM" },
{ "agentName": "Lanie Brinkler", "employeeQueueName": "Ticket flow for email", "avgFirstResponseTime": "1:36 PM", "avgResolutionTime": "3:01 AM", "avgHandlingTime": "4:43 AM", "activeTime": "5:16 PM", "breakTime": "10:37 AM", "totalLogin": "10:39 PM" },
{ "agentName": "Diego Tracey", "employeeQueueName": "Finance AR", "avgFirstResponseTime": "8:38 PM", "avgResolutionTime": "1:31 AM", "avgHandlingTime": "7:06 AM", "activeTime": "7:17 AM", "breakTime": "9:31 PM", "totalLogin": "7:34 AM" },
{ "agentName": "Rana Fenna", "employeeQueueName": "Legal", "avgFirstResponseTime": "8:19 AM", "avgResolutionTime": "4:32 AM", "avgHandlingTime": "8:00 PM", "activeTime": "1:27 PM", "breakTime": "12:42 AM", "totalLogin": "8:16 PM" },
{ "agentName": "Lidia Sydenham", "employeeQueueName": "HROps", "avgFirstResponseTime": "12:07 PM", "avgResolutionTime": "10:13 PM", "avgHandlingTime": "12:57 PM", "activeTime": "8:10 PM", "breakTime": "11:37 PM", "totalLogin": "1:00 PM" },
{ "agentName": "Clarinda Kilfoyle", "employeeQueueName": "Finance AR", "avgFirstResponseTime": "10:04 PM", "avgResolutionTime": "11:56 PM", "avgHandlingTime": "8:43 PM", "activeTime": "3:35 AM", "breakTime": "2:48 PM", "totalLogin": "3:52 AM" },
{ "agentName": "Gizela Baake", "employeeQueueName": "HROps", "avgFirstResponseTime": "12:13 AM", "avgResolutionTime": "9:09 PM", "avgHandlingTime": "6:55 PM", "activeTime": "10:07 AM", "breakTime": "5:52 PM", "totalLogin": "1:10 AM" },
{ "agentName": "Idalina Bolus", "employeeQueueName": "Creative Marketing", "avgFirstResponseTime": "3:35 AM", "avgResolutionTime": "7:52 PM", "avgHandlingTime": "3:02 AM", "activeTime": "12:59 PM", "breakTime": "9:23 PM", "totalLogin": "10:03 PM" },
{ "agentName": "Josie Cawston", "employeeQueueName": "HRGA", "avgFirstResponseTime": "8:14 AM", "avgResolutionTime": "11:02 PM", "avgHandlingTime": "6:31 AM", "activeTime": "2:02 PM", "breakTime": "4:35 AM", "totalLogin": "7:30 AM" },
{ "agentName": "Weidar Linstead", "employeeQueueName": "Finance AP", "avgFirstResponseTime": "5:54 AM", "avgResolutionTime": "5:52 AM", "avgHandlingTime": "8:53 AM", "activeTime": "9:41 PM", "breakTime": "5:49 AM", "totalLogin": "1:11 PM" },
{ "agentName": "Charlotta Beney", "employeeQueueName": "HRGA", "avgFirstResponseTime": "6:53 PM", "avgResolutionTime": "6:56 AM", "avgHandlingTime": "9:16 PM", "activeTime": "8:36 PM", "breakTime": "9:10 AM", "totalLogin": "1:25 PM" },
{ "agentName": "Natal Du Plantier", "employeeQueueName": "Creative Marketing", "avgFirstResponseTime": "11:37 AM", "avgResolutionTime": "3:24 PM", "avgHandlingTime": "3:58 AM", "activeTime": "12:31 AM", "breakTime": "5:25 AM", "totalLogin": "2:41 PM" },
{ "agentName": "Moll Featley", "employeeQueueName": "Ticket flow for email", "avgFirstResponseTime": "2:58 PM", "avgResolutionTime": "10:28 AM", "avgHandlingTime": "9:23 PM", "activeTime": "11:02 AM", "breakTime": "4:38 PM", "totalLogin": "8:49 PM" },
{ "agentName": "Gert Slaten", "employeeQueueName": "Ticket flow for email", "avgFirstResponseTime": "7:04 AM", "avgResolutionTime": "9:41 PM", "avgHandlingTime": "9:49 PM", "activeTime": "12:40 PM", "breakTime": "12:56 PM", "totalLogin": "8:19 AM" },
{ "agentName": "Laural Churching", "employeeQueueName": "Finance AR", "avgFirstResponseTime": "8:32 AM", "avgResolutionTime": "11:42 PM", "avgHandlingTime": "3:19 AM", "activeTime": "4:10 PM", "breakTime": "9:22 PM", "totalLogin": "1:20 PM" },
{ "agentName": "Boot Novelli", "employeeQueueName": "HRGA", "avgFirstResponseTime": "1:10 PM", "avgResolutionTime": "10:55 AM", "avgHandlingTime": "3:31 AM", "activeTime": "7:12 AM", "breakTime": "7:27 PM", "totalLogin": "7:15 PM" },
{ "agentName": "Joanna Berens", "employeeQueueName": "HRGA", "avgFirstResponseTime": "4:21 AM", "avgResolutionTime": "5:20 AM", "avgHandlingTime": "9:25 PM", "activeTime": "10:46 AM", "breakTime": "8:31 PM", "totalLogin": "12:56 PM" },
{ "agentName": "Daisi McSorley", "employeeQueueName": "Legal", "avgFirstResponseTime": "2:19 AM", "avgResolutionTime": "3:06 AM", "avgHandlingTime": "12:54 PM", "activeTime": "12:29 AM", "breakTime": "5:10 AM", "totalLogin": "8:59 PM" },
{ "agentName": "Scarlett Wigfall", "employeeQueueName": "HRGA", "avgFirstResponseTime": "1:52 AM", "avgResolutionTime": "7:07 AM", "avgHandlingTime": "6:05 PM", "activeTime": "7:59 AM", "breakTime": "5:26 PM", "totalLogin": "10:39 PM" },
{ "agentName": "Lydon Garfath", "employeeQueueName": "HROps", "avgFirstResponseTime": "12:57 AM", "avgResolutionTime": "3:13 AM", "avgHandlingTime": "3:28 AM", "activeTime": "7:53 AM", "breakTime": "8:11 PM", "totalLogin": "3:24 AM" },
{ "agentName": "Lorrin Tolworth", "employeeQueueName": "Finance AR", "avgFirstResponseTime": "11:39 AM", "avgResolutionTime": "5:08 AM", "avgHandlingTime": "1:04 PM", "activeTime": "6:36 PM", "breakTime": "9:13 AM", "totalLogin": "5:47 AM" },
{ "agentName": "Herc Somes", "employeeQueueName": "Creative Marketing", "avgFirstResponseTime": "11:37 AM", "avgResolutionTime": "9:24 PM", "avgHandlingTime": "1:33 PM", "activeTime": "12:00 AM", "breakTime": "8:37 AM", "totalLogin": "11:52 AM" },
{ "agentName": "Barrett Garza", "employeeQueueName": "HROps", "avgFirstResponseTime": "8:19 PM", "avgResolutionTime": "12:34 PM", "avgHandlingTime": "1:49 AM", "activeTime": "2:37 AM", "breakTime": "4:56 PM", "totalLogin": "6:35 PM" },
{ "agentName": "Eddie McGing", "employeeQueueName": "HROps", "avgFirstResponseTime": "6:11 PM", "avgResolutionTime": "2:27 PM", "avgHandlingTime": "6:15 PM", "activeTime": "4:22 PM", "breakTime": "6:56 AM", "totalLogin": "2:44 PM" },
{ "agentName": "Misha Deplacido", "employeeQueueName": "HROps", "avgFirstResponseTime": "11:46 AM", "avgResolutionTime": "10:41 PM", "avgHandlingTime": "9:11 PM", "activeTime": "11:13 PM", "breakTime": "8:20 AM", "totalLogin": "10:42 PM" },
{ "agentName": "Nadia Hymer", "employeeQueueName": "Legal", "avgFirstResponseTime": "2:39 PM", "avgResolutionTime": "3:28 PM", "avgHandlingTime": "3:35 PM", "activeTime": "11:41 PM", "breakTime": "10:33 AM", "totalLogin": "6:59 PM" },
{ "agentName": "Kerry Connop", "employeeQueueName": "HROps", "avgFirstResponseTime": "12:08 AM", "avgResolutionTime": "6:26 PM", "avgHandlingTime": "2:01 AM", "activeTime": "7:37 AM", "breakTime": "5:15 PM", "totalLogin": "9:42 PM" },
{ "agentName": "Redford Fugere", "employeeQueueName": "HRGA", "avgFirstResponseTime": "8:29 AM", "avgResolutionTime": "1:16 PM", "avgHandlingTime": "11:54 PM", "activeTime": "2:03 PM", "breakTime": "3:30 AM", "totalLogin": "6:35 AM" },
{ "agentName": "Maddy Wagon", "employeeQueueName": "Finance AR", "avgFirstResponseTime": "2:03 PM", "avgResolutionTime": "8:49 AM", "avgHandlingTime": "10:18 PM", "activeTime": "6:54 AM", "breakTime": "4:37 PM", "totalLogin": "12:26 PM" },
{ "agentName": "Jade Sivyour", "employeeQueueName": "HROps", "avgFirstResponseTime": "8:28 PM", "avgResolutionTime": "7:02 PM", "avgHandlingTime": "9:35 AM", "activeTime": "3:58 AM", "breakTime": "6:16 PM", "totalLogin": "10:30 PM" },
{ "agentName": "Spense Stannion", "employeeQueueName": "Ticket flow for email", "avgFirstResponseTime": "4:58 AM", "avgResolutionTime": "6:14 AM", "avgHandlingTime": "7:21 AM", "activeTime": "6:18 PM", "breakTime": "8:46 AM", "totalLogin": "12:16 PM" },
{ "agentName": "Darn Allott", "employeeQueueName": "HROps", "avgFirstResponseTime": "10:29 PM", "avgResolutionTime": "6:34 PM", "avgHandlingTime": "2:29 AM", "activeTime": "1:06 PM", "breakTime": "5:59 AM", "totalLogin": "9:10 PM" },
{ "agentName": "Howey Storcke", "employeeQueueName": "Creative Marketing", "avgFirstResponseTime": "10:42 PM", "avgResolutionTime": "2:31 PM", "avgHandlingTime": "12:15 AM", "activeTime": "6:16 AM", "breakTime": "12:46 PM", "totalLogin": "10:06 PM" },
{ "agentName": "Tammara Thaller", "employeeQueueName": "Creative Marketing", "avgFirstResponseTime": "1:33 PM", "avgResolutionTime": "3:16 AM", "avgHandlingTime": "11:43 PM", "activeTime": "7:14 AM", "breakTime": "8:19 PM", "totalLogin": "8:11 AM" },
{ "agentName": "Angelica Symington", "employeeQueueName": "Legal", "avgFirstResponseTime": "5:15 AM", "avgResolutionTime": "8:43 PM", "avgHandlingTime": "3:15 AM", "activeTime": "12:45 AM", "breakTime": "9:38 AM", "totalLogin": "7:47 PM" },
{ "agentName": "Kurtis Harpur", "employeeQueueName": "Finance AR", "avgFirstResponseTime": "2:26 AM", "avgResolutionTime": "12:18 AM", "avgHandlingTime": "7:30 AM", "activeTime": "2:01 AM", "breakTime": "5:53 AM", "totalLogin": "5:18 PM" },
{ "agentName": "Dot Smeuin", "employeeQueueName": "Finance AR", "avgFirstResponseTime": "11:40 AM", "avgResolutionTime": "2:10 AM", "avgHandlingTime": "12:03 AM", "activeTime": "8:09 PM", "breakTime": "2:59 AM", "totalLogin": "6:05 PM" },
{ "agentName": "Walsh Petraitis", "employeeQueueName": "Legal", "avgFirstResponseTime": "7:26 AM", "avgResolutionTime": "4:17 AM", "avgHandlingTime": "2:27 PM", "activeTime": "3:10 AM", "breakTime": "4:34 AM", "totalLogin": "8:43 AM" },
{ "agentName": "Gavra D'Emanuele", "employeeQueueName": "Finance AP", "avgFirstResponseTime": "11:11 AM", "avgResolutionTime": "8:17 PM", "avgHandlingTime": "1:21 PM", "activeTime": "12:29 PM", "breakTime": "4:03 AM", "totalLogin": "5:13 AM" },
{ "agentName": "Basilius Biscomb", "employeeQueueName": "HRGA", "avgFirstResponseTime": "5:59 PM", "avgResolutionTime": "4:58 AM", "avgHandlingTime": "3:36 PM", "activeTime": "12:12 PM", "breakTime": "3:08 PM", "totalLogin": "9:13 AM" },
{ "agentName": "Issy Baird", "employeeQueueName": "HRGA", "avgFirstResponseTime": "4:37 PM", "avgResolutionTime": "2:35 PM", "avgHandlingTime": "6:04 PM", "activeTime": "10:25 AM", "breakTime": "5:03 PM", "totalLogin": "4:03 AM" },
{ "agentName": "Haydon Knee", "employeeQueueName": "Finance AP", "avgFirstResponseTime": "6:37 AM", "avgResolutionTime": "7:49 AM", "avgHandlingTime": "11:49 AM", "activeTime": "2:10 PM", "breakTime": "4:17 AM", "totalLogin": "5:08 PM" },
{ "agentName": "Harmonia Elstub", "employeeQueueName": "Creative Marketing", "avgFirstResponseTime": "12:42 PM", "avgResolutionTime": "7:52 AM", "avgHandlingTime": "2:57 PM", "activeTime": "10:07 PM", "breakTime": "3:34 PM", "totalLogin": "4:13 PM" },
{ "agentName": "Clay Tregonna", "employeeQueueName": "Ticket flow for email", "avgFirstResponseTime": "2:40 PM", "avgResolutionTime": "10:00 PM", "avgHandlingTime": "5:46 PM", "activeTime": "11:48 PM", "breakTime": "7:59 PM", "totalLogin": "4:44 AM" },
{ "agentName": "Ninnette O'Shea", "employeeQueueName": "Finance AR", "avgFirstResponseTime": "2:28 AM", "avgResolutionTime": "1:18 AM", "avgHandlingTime": "4:06 AM", "activeTime": "2:39 AM", "breakTime": "1:05 AM", "totalLogin": "3:12 AM" },
{ "agentName": "Brod Merrilees", "employeeQueueName": "HRGA", "avgFirstResponseTime": "1:48 PM", "avgResolutionTime": "1:05 PM", "avgHandlingTime": "3:18 AM", "activeTime": "1:35 AM", "breakTime": "10:03 PM", "totalLogin": "7:11 PM" },
{ "agentName": "Emilie Possek", "employeeQueueName": "HRGA", "avgFirstResponseTime": "4:01 AM", "avgResolutionTime": "1:09 AM", "avgHandlingTime": "8:50 PM", "activeTime": "11:08 AM", "breakTime": "3:51 AM", "totalLogin": "6:19 PM" },
{ "agentName": "Tera Hicks", "employeeQueueName": "Finance AR", "avgFirstResponseTime": "1:51 PM", "avgResolutionTime": "10:28 AM", "avgHandlingTime": "11:22 AM", "activeTime": "2:07 PM", "breakTime": "3:13 PM", "totalLogin": "11:28 AM" },
{ "agentName": "Arch Grancher", "employeeQueueName": "Finance AP", "avgFirstResponseTime": "12:58 AM", "avgResolutionTime": "3:42 PM", "avgHandlingTime": "2:27 AM", "activeTime": "11:54 AM", "breakTime": "12:56 AM", "totalLogin": "4:29 AM" },
{ "agentName": "Darcey Robert", "employeeQueueName": "Creative Marketing", "avgFirstResponseTime": "9:43 AM", "avgResolutionTime": "1:55 PM", "avgHandlingTime": "3:25 PM", "activeTime": "7:00 PM", "breakTime": "5:29 PM", "totalLogin": "12:41 AM" },
{ "agentName": "Nanny Mitchelmore", "employeeQueueName": "HROps", "avgFirstResponseTime": "2:55 PM", "avgResolutionTime": "7:29 PM", "avgHandlingTime": "9:54 PM", "activeTime": "5:48 PM", "breakTime": "3:57 AM", "totalLogin": "3:30 AM" },
{ "agentName": "Mathian Feavers", "employeeQueueName": "Finance AP", "avgFirstResponseTime": "1:31 AM", "avgResolutionTime": "4:48 PM", "avgHandlingTime": "6:58 AM", "activeTime": "3:35 PM", "breakTime": "3:37 PM", "totalLogin": "6:39 PM" },
{ "agentName": "Heinrik Elsmor", "employeeQueueName": "Ticket flow for email", "avgFirstResponseTime": "6:32 PM", "avgResolutionTime": "7:20 AM", "avgHandlingTime": "12:28 PM", "activeTime": "9:59 PM", "breakTime": "3:09 AM", "totalLogin": "6:11 PM" },
{ "agentName": "Ernesto Twitchings", "employeeQueueName": "Ticket flow for email", "avgFirstResponseTime": "3:22 PM", "avgResolutionTime": "4:52 PM", "avgHandlingTime": "8:00 AM", "activeTime": "4:30 AM", "breakTime": "7:53 AM", "totalLogin": "11:11 AM" },
{ "agentName": "Curry Dulson", "employeeQueueName": "Legal", "avgFirstResponseTime": "3:37 PM", "avgResolutionTime": "1:12 AM", "avgHandlingTime": "9:38 AM", "activeTime": "11:53 AM", "breakTime": "6:12 PM", "totalLogin": "6:28 PM" },
{ "agentName": "Lexy Margiotta", "employeeQueueName": "Creative Marketing", "avgFirstResponseTime": "6:55 AM", "avgResolutionTime": "6:45 PM", "avgHandlingTime": "3:11 PM", "activeTime": "11:33 PM", "breakTime": "4:24 AM", "totalLogin": "3:25 PM" },
{ "agentName": "Michaella Cherryman", "employeeQueueName": "HROps", "avgFirstResponseTime": "12:36 AM", "avgResolutionTime": "2:30 AM", "avgHandlingTime": "4:28 PM", "activeTime": "2:55 AM", "breakTime": "1:15 PM", "totalLogin": "7:13 PM" },
{ "agentName": "Elsi Huckin", "employeeQueueName": "Legal", "avgFirstResponseTime": "9:08 PM", "avgResolutionTime": "8:26 AM", "avgHandlingTime": "6:41 AM", "activeTime": "1:24 AM", "breakTime": "8:44 PM", "totalLogin": "1:51 PM" },
{ "agentName": "Sharia Cuesta", "employeeQueueName": "Legal", "avgFirstResponseTime": "10:02 PM", "avgResolutionTime": "12:29 PM", "avgHandlingTime": "6:37 PM", "activeTime": "7:23 AM", "breakTime": "6:55 AM", "totalLogin": "8:46 AM" },
{ "agentName": "Giraud Renault", "employeeQueueName": "Legal", "avgFirstResponseTime": "3:38 PM", "avgResolutionTime": "10:21 AM", "avgHandlingTime": "10:50 AM", "activeTime": "7:16 PM", "breakTime": "1:57 AM", "totalLogin": "7:05 PM" },
{ "agentName": "Bessie Rideout", "employeeQueueName": "Legal", "avgFirstResponseTime": "11:20 PM", "avgResolutionTime": "12:40 AM", "avgHandlingTime": "12:25 PM", "activeTime": "8:59 PM", "breakTime": "2:32 PM", "totalLogin": "5:39 PM" },
{ "agentName": "Florida Cubitt", "employeeQueueName": "Legal", "avgFirstResponseTime": "3:16 PM", "avgResolutionTime": "11:37 AM", "avgHandlingTime": "6:15 PM", "activeTime": "7:55 AM", "breakTime": "10:20 AM", "totalLogin": "7:27 AM" },
{ "agentName": "Joshuah Bassindale", "employeeQueueName": "Ticket flow for email", "avgFirstResponseTime": "3:24 AM", "avgResolutionTime": "8:10 PM", "avgHandlingTime": "10:06 AM", "activeTime": "9:16 PM", "breakTime": "2:17 PM", "totalLogin": "6:12 PM" },
{ "agentName": "Richardo Chitham", "employeeQueueName": "Finance AR", "avgFirstResponseTime": "2:51 PM", "avgResolutionTime": "2:27 PM", "avgHandlingTime": "6:45 AM", "activeTime": "5:37 PM", "breakTime": "7:08 AM", "totalLogin": "11:25 AM" },
{ "agentName": "Wilona Maymand", "employeeQueueName": "Finance AR", "avgFirstResponseTime": "4:37 PM", "avgResolutionTime": "2:00 PM", "avgHandlingTime": "2:38 AM", "activeTime": "12:08 AM", "breakTime": "7:13 AM", "totalLogin": "6:57 AM" },
{ "agentName": "Jeane Durham", "employeeQueueName": "Creative Marketing", "avgFirstResponseTime": "12:00 AM", "avgResolutionTime": "7:14 AM", "avgHandlingTime": "8:11 AM", "activeTime": "3:58 PM", "breakTime": "4:47 AM", "totalLogin": "6:46 PM" },
{ "agentName": "Bruis Gorey", "employeeQueueName": "HRGA", "avgFirstResponseTime": "5:37 AM", "avgResolutionTime": "11:06 PM", "avgHandlingTime": "1:02 PM", "activeTime": "7:10 PM", "breakTime": "3:09 PM", "totalLogin": "8:43 AM" },
{ "agentName": "Hanny Simony", "employeeQueueName": "HRGA", "avgFirstResponseTime": "1:45 AM", "avgResolutionTime": "4:57 AM", "avgHandlingTime": "9:19 AM", "activeTime": "7:04 AM", "breakTime": "5:48 PM", "totalLogin": "3:46 PM" }]
const useColumns = () => {
    const columnHelper = createColumnHelper<IAgentPerformanceProductivity>()

    const columns = [
        columnHelper.group({
            id: 'employeeDetails',
            header: () => <span style={{ color: '#676E7B' }}>Employee Details</span>,
            meta: {
                disableColReorder: true
            },
            columns: [
                columnHelper.accessor('agentName', {
                    header: 'Agent Name',
                    id: 'agentName',
                    cell: info => info.getValue(),
                    minSize: 120
                }),
                columnHelper.accessor('employeeQueueName', {
                    id: 'employeeQueueName',
                    cell: info => info.getValue(),
                    header: 'Employee Queue Name'
                }),
            ],
        }),
        columnHelper.group({
            id: 'allPerformance',
            header: 'All Performance',
            meta: {
                disableColReorder: true
            },
            columns: [
                columnHelper.accessor('avgFirstResponseTime', {
                    header: 'Avg First Response Time',
                    id: 'avgFirstResponseTime',
                    cell: info => info.getValue(),
                }),
                columnHelper.accessor('avgResolutionTime', {
                    id: 'avgResolutionTime',
                    cell: info => info.getValue(),
                    header: 'Avg Resolution Time'
                }),
                columnHelper.accessor('avgHandlingTime', {
                    id: 'avgHandlingTime',
                    cell: info => info.getValue(),
                    header: 'Avg Handling Time'
                }),
            ],
        }),
        columnHelper.group({
            id: 'agentPerformance',
            header: 'Agent Performance',
            meta: {
                disableColReorder: true
            },
            columns: [
                columnHelper.accessor('activeTime', {
                    header: 'Active Time',
                    id: 'activeTime',
                    cell: info => info.getValue(),
                    minSize: 120
                }),
                columnHelper.accessor('totalLogin', {
                    id: 'totalLogin',
                    cell: info => info.getValue(),
                    header: 'Total Login'
                }),
                columnHelper.accessor('breakTime', {
                    id: 'breakTime',
                    cell: info => info.getValue(),
                    header: 'Break Time'
                }),
            ],
        }),

    ];

    return columns;
}
export const DashboardLayout = () => {
    const [value, setValue] = useState(0);
    const columns = useColumns();

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <FlexBox $flexDirection="column" $height="calc(100% - 43px)">
            <Tabs value={value} onChange={handleChange}>
                <Tab label="Agent Performance" id="agent-performance" />
                <Tab label="Folder Performance" id="folder-performance" />
                <Tab label="Queue Performance" id="queue-performance" />
                <Tab label="Time Wise Dashboard" id="time-wise-dashboard" />
            </Tabs>
            <CustomTabPanel index={0} value={value}>
                <DataGrid
                    data={data}
                    columns={columns}
                    hideTableControls />
            </CustomTabPanel>
        </FlexBox>
    )
}

const Container = styled.div`
    height: calc(100% - 48px);
    padding: 16px;
    box-sizing: border-box;
    max-height: 400px;
`
function CustomTabPanel(props: {
    children?: React.ReactNode;
    index: number;
    value: number;
}) {
    const { children, value, index } = props;

    return (
        <Container
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}>
            {value === index && (
                <>{children}</>
            )}
        </Container>
    );
}