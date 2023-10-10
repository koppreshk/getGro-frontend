import React from "react";

interface ITicketDetails {
    ticketSource: string;
    ticketId: string;
    customerName: string;
    ticketStatus: string;
    ticketSubStatus: string;
    createdDate: string;
    priority: string;
}

export const hardcodedData: ITicketDetails[] = [{ "ticketSource": "Facebook", "ticketId": "6e3afb9c-d83f-4060-80b1-5a3283eb088b", "customerName": "Tilly Moughton", "createdDate": "16/06/2023", "ticketStatus": "assigned", "ticketSubStatus": "Unanswered", "priority": "Low" },
{ "ticketSource": "whatsapp", "ticketId": "84301c1f-3d02-451f-a008-e594b3950cfe", "customerName": "Antin Fossord", "createdDate": "08/03/2023", "ticketStatus": "assigned", "ticketSubStatus": "Answered", "priority": "High" },
{ "ticketSource": "twitter", "ticketId": "af0af2cf-ab41-4229-aa63-81ed9f212b16", "customerName": "Karly Kluge", "createdDate": "16/05/2023", "ticketStatus": "unassigned", "ticketSubStatus": "Answered", "priority": "Low" },
{ "ticketSource": "Telephone", "ticketId": "baf4ba79-1096-4a75-942d-40097f223aa2", "customerName": "Marna Lago", "createdDate": "05/04/2023", "ticketStatus": "assigned", "ticketSubStatus": "Customer Replied", "priority": "Medium" },
{ "ticketSource": "Email", "ticketId": "3151a025-7eb9-4a4a-b382-c5431c6548c3", "customerName": "Alysia Crosskell", "createdDate": "30/04/2023", "ticketStatus": "assigned", "ticketSubStatus": "Answered", "priority": "Low" },
{ "ticketSource": "Facebook", "ticketId": "7b2a2001-9138-466c-95e3-7a7affee091a", "customerName": "Joell Pesterfield", "createdDate": "20/11/2022", "ticketStatus": "unassigned", "ticketSubStatus": "Answered", "priority": "High" },
{ "ticketSource": "Email", "ticketId": "82f53f1a-1f6a-4d43-887a-59ea490b2930", "customerName": "Sylvia Mullett", "createdDate": "02/11/2022", "ticketStatus": "unassigned", "ticketSubStatus": "Unattended", "priority": "Critical" },
{ "ticketSource": "twitter", "ticketId": "1783df99-5b78-4e77-a991-1aebaa989d3d", "customerName": "Carolan Clewley", "createdDate": "12/08/2023", "ticketStatus": "assigned", "ticketSubStatus": "Unanswered", "priority": "High" },
{ "ticketSource": "Telephone", "ticketId": "4a62b6fc-8ffe-4069-b1f4-8e9c43486da9", "customerName": "Jesse Jakoubec", "createdDate": "23/02/2023", "ticketStatus": "assigned", "ticketSubStatus": "Unattended", "priority": "Medium" },
{ "ticketSource": "whatsapp", "ticketId": "53aaa773-ab4f-4a84-957b-4362dfb7ee53", "customerName": "Ragnar Cheeke", "createdDate": "16/07/2023", "ticketStatus": "assigned", "ticketSubStatus": "Unanswered", "priority": "Low" },
{ "ticketSource": "Facebook", "ticketId": "d27a80a3-5005-44f7-886c-7248351e8d2d", "customerName": "Gilemette Felderer", "createdDate": "03/10/2022", "ticketStatus": "assigned", "ticketSubStatus": "Customer Replied", "priority": "Critical" },
{ "ticketSource": "Telephone", "ticketId": "939257b4-57ff-4941-b767-219d407ebd9d", "customerName": "Verge Stoneham", "createdDate": "22/01/2023", "ticketStatus": "unassigned", "ticketSubStatus": "Unanswered", "priority": "Low" },
{ "ticketSource": "instagram", "ticketId": "c2ffb5bf-5798-499f-af2e-e6db02e0cba9", "customerName": "Lincoln Sweeting", "createdDate": "08/09/2023", "ticketStatus": "assigned", "ticketSubStatus": "Unattended", "priority": "High" },
{ "ticketSource": "instagram", "ticketId": "7cfded38-5367-4d07-9914-303d33f2424b", "customerName": "Greta Canet", "createdDate": "28/02/2023", "ticketStatus": "unassigned", "ticketSubStatus": "Customer Replied", "priority": "High" },
{ "ticketSource": "Telephone", "ticketId": "8e900842-bfda-4af0-8c87-747f9cb3b3d5", "customerName": "Rube Kinnon", "createdDate": "01/02/2023", "ticketStatus": "assigned", "ticketSubStatus": "Answered", "priority": "Medium" },
{ "ticketSource": "Facebook", "ticketId": "2c6f6c1c-d9aa-4c1f-aad6-895f3a92bd87", "customerName": "Sherwynd Mafham", "createdDate": "19/01/2023", "ticketStatus": "assigned", "ticketSubStatus": "Customer Replied", "priority": "Low" },
{ "ticketSource": "Facebook", "ticketId": "8bd21e20-29e8-4304-bcc8-3cbc18ce5ea1", "customerName": "Cece Hallatt", "createdDate": "22/01/2023", "ticketStatus": "assigned", "ticketSubStatus": "Answered", "priority": "Low" },
{ "ticketSource": "Email", "ticketId": "c52098f5-428f-4ea3-b03d-097a07691d31", "customerName": "Ardella Bouldstridge", "createdDate": "12/06/2023", "ticketStatus": "assigned", "ticketSubStatus": "Answered", "priority": "Low" },
{ "ticketSource": "Email", "ticketId": "c0832623-ce61-41ef-9a68-5010cd37d2ce", "customerName": "Raymond Stallworth", "createdDate": "01/01/2023", "ticketStatus": "unassigned", "ticketSubStatus": "Customer Replied", "priority": "Medium" },
{ "ticketSource": "whatsapp", "ticketId": "ee7f21d5-29f4-45cb-b346-9e50f1611bd5", "customerName": "Stella Knapman", "createdDate": "18/08/2023", "ticketStatus": "unassigned", "ticketSubStatus": "Customer Replied", "priority": "Low" },
{ "ticketSource": "twitter", "ticketId": "bcfcc7aa-02c4-43b3-9f27-17c7e8f7cecd", "customerName": "Palm McVitie", "createdDate": "04/11/2022", "ticketStatus": "assigned", "ticketSubStatus": "Unanswered", "priority": "Medium" },
{ "ticketSource": "whatsapp", "ticketId": "a8eaed1e-517b-4824-9749-dba35e92b0d9", "customerName": "Franklin Rigden", "createdDate": "27/09/2023", "ticketStatus": "assigned", "ticketSubStatus": "Customer Replied", "priority": "Critical" },
{ "ticketSource": "SMS", "ticketId": "151914d3-62d7-4bf2-8d3e-d8cfc881c5bd", "customerName": "Margalo Schrader", "createdDate": "10/08/2023", "ticketStatus": "unassigned", "ticketSubStatus": "Customer Replied", "priority": "Low" },
{ "ticketSource": "SMS", "ticketId": "06c7fa37-51b4-41f5-8900-4f8b2b6566c7", "customerName": "Devin Pim", "createdDate": "08/02/2023", "ticketStatus": "unassigned", "ticketSubStatus": "Answered", "priority": "Low" },
{ "ticketSource": "Email", "ticketId": "36aa25cb-66f3-4af6-b948-393cb18e01c4", "customerName": "Lorens Igglesden", "createdDate": "27/02/2023", "ticketStatus": "unassigned", "ticketSubStatus": "Unanswered", "priority": "High" },
{ "ticketSource": "Email", "ticketId": "cac17f8c-36f4-431e-928f-cf0ed8ce2f2a", "customerName": "Svend Howgego", "createdDate": "04/06/2023", "ticketStatus": "unassigned", "ticketSubStatus": "Unattended", "priority": "Medium" },
{ "ticketSource": "Facebook", "ticketId": "856500f3-f9ba-45a2-94a2-e41c79d8f5c7", "customerName": "Tandy Colisbe", "createdDate": "28/11/2022", "ticketStatus": "unassigned", "ticketSubStatus": "Unattended", "priority": "High" },
{ "ticketSource": "Facebook", "ticketId": "c8d03052-535e-4895-bc9c-c2da971b05ab", "customerName": "Carleton Lamborne", "createdDate": "28/08/2023", "ticketStatus": "unassigned", "ticketSubStatus": "Unattended", "priority": "High" },
{ "ticketSource": "whatsapp", "ticketId": "9f06a9e7-adf8-457b-b6dc-b0618572a942", "customerName": "Audrey Jewiss", "createdDate": "17/10/2022", "ticketStatus": "unassigned", "ticketSubStatus": "Customer Replied", "priority": "Critical" },
{ "ticketSource": "SMS", "ticketId": "63b5d620-2fcc-45c2-acc7-08a51abbb7ca", "customerName": "Terri Frankland", "createdDate": "12/08/2023", "ticketStatus": "assigned", "ticketSubStatus": "Unanswered", "priority": "Critical" },
{ "ticketSource": "Email", "ticketId": "78630d12-dac0-4f3c-bd6d-734037ea4950", "customerName": "Victor Nassie", "createdDate": "25/10/2022", "ticketStatus": "assigned", "ticketSubStatus": "Customer Replied", "priority": "Medium" },
{ "ticketSource": "Facebook", "ticketId": "992c3e14-ac6e-4691-8c56-f277008b0ab2", "customerName": "Otto Imason", "createdDate": "26/05/2023", "ticketStatus": "assigned", "ticketSubStatus": "Answered", "priority": "High" },
{ "ticketSource": "Email", "ticketId": "5d9f29bc-168f-49ea-a9ee-dd166bde24bd", "customerName": "Cherlyn Lenchenko", "createdDate": "04/01/2023", "ticketStatus": "unassigned", "ticketSubStatus": "Answered", "priority": "Low" },
{ "ticketSource": "twitter", "ticketId": "3b788e72-f004-4f48-a543-8eb197f0b09f", "customerName": "Jo-anne Egle of Germany", "createdDate": "24/08/2023", "ticketStatus": "unassigned", "ticketSubStatus": "Unattended", "priority": "High" },
{ "ticketSource": "Email", "ticketId": "c4f3e68e-39c9-4d5e-9f84-9b87d0510cbe", "customerName": "Sascha Bernat", "createdDate": "03/03/2023", "ticketStatus": "assigned", "ticketSubStatus": "Unattended", "priority": "High" },
{ "ticketSource": "Facebook", "ticketId": "d4a9b5de-a1ca-4350-b819-38b2058eff96", "customerName": "Dennie Rawstorn", "createdDate": "09/11/2022", "ticketStatus": "unassigned", "ticketSubStatus": "Customer Replied", "priority": "High" },
{ "ticketSource": "whatsapp", "ticketId": "bffa09bb-854f-4717-b095-c7384bc46097", "customerName": "Whitman Clemas", "createdDate": "10/08/2023", "ticketStatus": "unassigned", "ticketSubStatus": "Unattended", "priority": "Low" },
{ "ticketSource": "SMS", "ticketId": "1fe01529-8d51-4013-b148-9304c8a8bbe5", "customerName": "Valida Forsaith", "createdDate": "08/01/2023", "ticketStatus": "unassigned", "ticketSubStatus": "Answered", "priority": "Medium" },
{ "ticketSource": "Email", "ticketId": "9c7676e3-b059-4061-aa59-eedc03f8411e", "customerName": "Vonny Bohea", "createdDate": "20/02/2023", "ticketStatus": "assigned", "ticketSubStatus": "Answered", "priority": "Low" },
{ "ticketSource": "twitter", "ticketId": "9f32a99a-35f7-4f50-bd52-1de543d56a2a", "customerName": "Dee dee Demongeot", "createdDate": "05/04/2023", "ticketStatus": "assigned", "ticketSubStatus": "Customer Replied", "priority": "High" },
{ "ticketSource": "twitter", "ticketId": "dbb0c709-aa6e-442e-a4f5-c948851eefc1", "customerName": "Marnie Edwards", "createdDate": "07/10/2022", "ticketStatus": "assigned", "ticketSubStatus": "Unanswered", "priority": "High" },
{ "ticketSource": "instagram", "ticketId": "22c57752-a164-4df1-abb8-a631e04db128", "customerName": "Lindsey Himsworth", "createdDate": "16/03/2023", "ticketStatus": "unassigned", "ticketSubStatus": "Unattended", "priority": "Low" },
{ "ticketSource": "instagram", "ticketId": "5ca0e161-b84a-4f47-8322-9d47e88d8e17", "customerName": "Benedict Deane", "createdDate": "16/05/2023", "ticketStatus": "assigned", "ticketSubStatus": "Answered", "priority": "High" },
{ "ticketSource": "SMS", "ticketId": "4e2672fb-671f-44e7-8dd0-62b6166641f9", "customerName": "Sharla Slingsby", "createdDate": "06/09/2023", "ticketStatus": "unassigned", "ticketSubStatus": "Customer Replied", "priority": "Medium" },
{ "ticketSource": "twitter", "ticketId": "832deb1e-2c8a-4e5d-b526-fb3f460e1fd8", "customerName": "Cello Davidove", "createdDate": "27/04/2023", "ticketStatus": "assigned", "ticketSubStatus": "Unattended", "priority": "Low" },
{ "ticketSource": "SMS", "ticketId": "43c978b4-9990-42f7-8897-e826ae0265c5", "customerName": "Marja Crevagh", "createdDate": "11/01/2023", "ticketStatus": "assigned", "ticketSubStatus": "Customer Replied", "priority": "Critical" },
{ "ticketSource": "Telephone", "ticketId": "8f309fad-e9cd-46fb-b289-c70d39b00801", "customerName": "Oralle Brolechan", "createdDate": "10/11/2022", "ticketStatus": "assigned", "ticketSubStatus": "Customer Replied", "priority": "Critical" },
{ "ticketSource": "Email", "ticketId": "1b4b48e1-fd6f-4adf-bb5c-759684e41711", "customerName": "Kippie Sautter", "createdDate": "06/06/2023", "ticketStatus": "assigned", "ticketSubStatus": "Answered", "priority": "High" },
{ "ticketSource": "instagram", "ticketId": "e6f2c49a-0369-4191-be4c-38f9ff312d10", "customerName": "Ron Gonnin", "createdDate": "13/04/2023", "ticketStatus": "assigned", "ticketSubStatus": "Unattended", "priority": "Medium" },
{ "ticketSource": "Email", "ticketId": "5b724a7e-29de-42af-ac5a-09d5abb8b13c", "customerName": "Darcy Shreeve", "createdDate": "11/08/2023", "ticketStatus": "unassigned", "ticketSubStatus": "Unattended", "priority": "Low" },
{ "ticketSource": "twitter", "ticketId": "abc67200-cf52-46a9-8d4a-64cb01b2ff7d", "customerName": "Steffi Tarplee", "createdDate": "24/01/2023", "ticketStatus": "unassigned", "ticketSubStatus": "Answered", "priority": "Critical" },
{ "ticketSource": "whatsapp", "ticketId": "eb63f3e2-8a1d-4429-93d2-fd985c7c3ddc", "customerName": "Kary Burnyate", "createdDate": "13/01/2023", "ticketStatus": "unassigned", "ticketSubStatus": "Unattended", "priority": "High" },
{ "ticketSource": "Email", "ticketId": "d6a56b31-e9b0-40d4-9168-ccb2c7fdb742", "customerName": "Jordanna Cruddace", "createdDate": "11/09/2023", "ticketStatus": "unassigned", "ticketSubStatus": "Unanswered", "priority": "Low" },
{ "ticketSource": "Telephone", "ticketId": "871964b1-076c-475b-aa3a-d0d0869cba72", "customerName": "Jaime Carluccio", "createdDate": "07/08/2023", "ticketStatus": "unassigned", "ticketSubStatus": "Answered", "priority": "Low" },
{ "ticketSource": "Email", "ticketId": "9ff0b80e-0a22-4bf8-af57-666737b48db9", "customerName": "Venus Wisam", "createdDate": "02/09/2023", "ticketStatus": "assigned", "ticketSubStatus": "Unanswered", "priority": "Low" },
{ "ticketSource": "SMS", "ticketId": "7227a3db-694e-4855-9efb-31611304b65a", "customerName": "Kev Cops", "createdDate": "03/04/2023", "ticketStatus": "assigned", "ticketSubStatus": "Answered", "priority": "High" },
{ "ticketSource": "instagram", "ticketId": "5bddfc04-aa18-45ef-a445-9487b54ad5e6", "customerName": "Jordain Flew", "createdDate": "12/04/2023", "ticketStatus": "assigned", "ticketSubStatus": "Unattended", "priority": "Medium" },
{ "ticketSource": "SMS", "ticketId": "6c1199d3-5d2d-4cec-ac6d-f51d7c2aec98", "customerName": "Reba Duggleby", "createdDate": "30/08/2023", "ticketStatus": "unassigned", "ticketSubStatus": "Customer Replied", "priority": "Low" },
{ "ticketSource": "Facebook", "ticketId": "1ff260d0-996d-444d-9bfd-df1fe734bb40", "customerName": "Tawnya Hyams", "createdDate": "18/03/2023", "ticketStatus": "unassigned", "ticketSubStatus": "Customer Replied", "priority": "Low" },
{ "ticketSource": "whatsapp", "ticketId": "f736b4c6-ef10-477b-9edb-d04638137f21", "customerName": "Pennie Creffield", "createdDate": "25/03/2023", "ticketStatus": "unassigned", "ticketSubStatus": "Customer Replied", "priority": "Critical" },
{ "ticketSource": "Facebook", "ticketId": "26a8e9a7-bfbf-4523-85cc-0db942cb35f4", "customerName": "Lettie Chalke", "createdDate": "12/01/2023", "ticketStatus": "unassigned", "ticketSubStatus": "Customer Replied", "priority": "Critical" },
{ "ticketSource": "instagram", "ticketId": "731fe460-d910-42b5-a0a1-ffaac71af8c6", "customerName": "Berkeley Pinar", "createdDate": "22/06/2023", "ticketStatus": "unassigned", "ticketSubStatus": "Customer Replied", "priority": "Medium" },
{ "ticketSource": "Email", "ticketId": "778b6468-67a2-4670-9caf-554893487bee", "customerName": "Arnold Justis", "createdDate": "29/01/2023", "ticketStatus": "unassigned", "ticketSubStatus": "Answered", "priority": "High" },
{ "ticketSource": "SMS", "ticketId": "8d1178b8-ee02-475a-ad4e-df1e299ec840", "customerName": "Mattie Dulanty", "createdDate": "19/09/2023", "ticketStatus": "assigned", "ticketSubStatus": "Unattended", "priority": "High" },
{ "ticketSource": "SMS", "ticketId": "4800e42b-61e5-40ed-bee4-93bc3943a14b", "customerName": "Bear Seabon", "createdDate": "29/04/2023", "ticketStatus": "unassigned", "ticketSubStatus": "Answered", "priority": "Low" },
{ "ticketSource": "twitter", "ticketId": "deadd7ac-dd70-486e-a882-70672201a628", "customerName": "Marabel Hogben", "createdDate": "06/10/2022", "ticketStatus": "unassigned", "ticketSubStatus": "Unanswered", "priority": "Critical" },
{ "ticketSource": "Facebook", "ticketId": "8e428656-ff1e-49be-961f-37e9aaeb2dcb", "customerName": "Tuck Caffrey", "createdDate": "26/04/2023", "ticketStatus": "unassigned", "ticketSubStatus": "Customer Replied", "priority": "High" },
{ "ticketSource": "instagram", "ticketId": "d9f41dfc-f0be-42a6-9614-39a2368cf279", "customerName": "Uriah Beales", "createdDate": "17/12/2022", "ticketStatus": "unassigned", "ticketSubStatus": "Answered", "priority": "Critical" },
{ "ticketSource": "Telephone", "ticketId": "8c298e86-0a23-454f-be26-6b81b6f7ab23", "customerName": "Alisander Brumen", "createdDate": "02/12/2022", "ticketStatus": "unassigned", "ticketSubStatus": "Answered", "priority": "High" },
{ "ticketSource": "twitter", "ticketId": "eaf45e10-c349-41e1-9e6e-33ca5dcfc06a", "customerName": "Daune Davenport", "createdDate": "05/07/2023", "ticketStatus": "assigned", "ticketSubStatus": "Unattended", "priority": "Medium" },
{ "ticketSource": "Telephone", "ticketId": "63e409f9-9165-43b9-93e6-a39883777411", "customerName": "Ruthe Alker", "createdDate": "09/03/2023", "ticketStatus": "assigned", "ticketSubStatus": "Answered", "priority": "High" },
{ "ticketSource": "whatsapp", "ticketId": "cdef5bdc-6412-441b-a088-48d4c6e70f85", "customerName": "Khalil Fleetham", "createdDate": "13/09/2023", "ticketStatus": "unassigned", "ticketSubStatus": "Unanswered", "priority": "Medium" },
{ "ticketSource": "Telephone", "ticketId": "aa22e82d-0100-4d20-897d-198540c9267a", "customerName": "Frayda Fearon", "createdDate": "11/06/2023", "ticketStatus": "unassigned", "ticketSubStatus": "Unattended", "priority": "Critical" },
{ "ticketSource": "SMS", "ticketId": "5afcfb6e-bf57-4921-bd6a-41781a005d8c", "customerName": "Peterus Whitear", "createdDate": "30/06/2023", "ticketStatus": "unassigned", "ticketSubStatus": "Answered", "priority": "Medium" },
{ "ticketSource": "SMS", "ticketId": "6203cc3f-69b8-4370-9cba-b168ca56af9f", "customerName": "Berri Keme", "createdDate": "08/07/2023", "ticketStatus": "assigned", "ticketSubStatus": "Customer Replied", "priority": "Medium" },
{ "ticketSource": "twitter", "ticketId": "0c0aac81-b8cb-4444-bf5d-33765edad03c", "customerName": "Guthrey Ambage", "createdDate": "18/04/2023", "ticketStatus": "unassigned", "ticketSubStatus": "Unanswered", "priority": "Medium" },
{ "ticketSource": "Telephone", "ticketId": "f21bd9e5-eb08-4c18-9213-edeb598ded0d", "customerName": "Odie Trewin", "createdDate": "30/03/2023", "ticketStatus": "assigned", "ticketSubStatus": "Unattended", "priority": "Medium" },
{ "ticketSource": "Email", "ticketId": "295a333d-48fd-4bae-914f-ba55052f409e", "customerName": "Jason Sadd", "createdDate": "25/03/2023", "ticketStatus": "unassigned", "ticketSubStatus": "Customer Replied", "priority": "Medium" },
{ "ticketSource": "whatsapp", "ticketId": "1c00bd12-d88f-4cc2-8d9e-67245a5a23c9", "customerName": "Osborne Coonan", "createdDate": "20/04/2023", "ticketStatus": "assigned", "ticketSubStatus": "Customer Replied", "priority": "Medium" },
{ "ticketSource": "twitter", "ticketId": "8fc12937-4bc2-4bb2-8b5c-b19d657ef041", "customerName": "Stern Drewery", "createdDate": "20/08/2023", "ticketStatus": "assigned", "ticketSubStatus": "Customer Replied", "priority": "Critical" },
{ "ticketSource": "twitter", "ticketId": "6530ba34-3345-46ac-8329-e9044728a0ee", "customerName": "Guenna Michieli", "createdDate": "02/10/2023", "ticketStatus": "unassigned", "ticketSubStatus": "Unattended", "priority": "Low" },
{ "ticketSource": "Email", "ticketId": "9a46436b-5840-4294-a908-e26a3a211e32", "customerName": "Chadd Bartosinski", "createdDate": "08/09/2023", "ticketStatus": "unassigned", "ticketSubStatus": "Customer Replied", "priority": "Medium" },
{ "ticketSource": "instagram", "ticketId": "0e2912a0-8d48-48b5-b8cc-2b7810d3fd5e", "customerName": "Henderson Gibbieson", "createdDate": "21/10/2022", "ticketStatus": "unassigned", "ticketSubStatus": "Answered", "priority": "Critical" },
{ "ticketSource": "twitter", "ticketId": "8980ce3d-7905-4ec8-a42a-83453a9f029d", "customerName": "Harmony Grelka", "createdDate": "12/08/2023", "ticketStatus": "assigned", "ticketSubStatus": "Unanswered", "priority": "Low" },
{ "ticketSource": "Email", "ticketId": "173206ec-8257-4653-b6e6-c63f5c4ad578", "customerName": "Paulina Arber", "createdDate": "31/01/2023", "ticketStatus": "unassigned", "ticketSubStatus": "Answered", "priority": "Medium" },
{ "ticketSource": "whatsapp", "ticketId": "1a4ef3a1-b243-4b5c-ade8-7432d1b98d38", "customerName": "Loretta Miko", "createdDate": "22/08/2023", "ticketStatus": "unassigned", "ticketSubStatus": "Customer Replied", "priority": "Critical" },
{ "ticketSource": "whatsapp", "ticketId": "574997e0-5277-4a99-9efb-c72c70c5893b", "customerName": "Laughton Burchard", "createdDate": "20/06/2023", "ticketStatus": "assigned", "ticketSubStatus": "Customer Replied", "priority": "Medium" },
{ "ticketSource": "SMS", "ticketId": "8f9c9cd9-2a2c-453f-b661-e682bda120f0", "customerName": "Darnell Dumbrill", "createdDate": "27/01/2023", "ticketStatus": "unassigned", "ticketSubStatus": "Customer Replied", "priority": "High" },
{ "ticketSource": "instagram", "ticketId": "660be7f8-601d-466a-802a-97c33ad91f95", "customerName": "Natale Gullis", "createdDate": "01/05/2023", "ticketStatus": "assigned", "ticketSubStatus": "Unanswered", "priority": "High" },
{ "ticketSource": "Email", "ticketId": "0c2cf513-65c9-4bb4-b1a3-5ece6ad33171", "customerName": "Beverie Yule", "createdDate": "31/03/2023", "ticketStatus": "assigned", "ticketSubStatus": "Customer Replied", "priority": "Low" },
{ "ticketSource": "Telephone", "ticketId": "828b1631-bfd4-4c93-869a-c617263eaa9b", "customerName": "Emmalyn Girtin", "createdDate": "17/06/2023", "ticketStatus": "unassigned", "ticketSubStatus": "Customer Replied", "priority": "High" },
{ "ticketSource": "twitter", "ticketId": "41c26011-1c07-41fc-89ff-c6fa66dd647e", "customerName": "Jessika Pitkins", "createdDate": "14/08/2023", "ticketStatus": "unassigned", "ticketSubStatus": "Customer Replied", "priority": "High" },
{ "ticketSource": "Facebook", "ticketId": "235ab8c3-b8d5-4521-87af-5b2f80dc0d5e", "customerName": "Luci Drakeley", "createdDate": "19/03/2023", "ticketStatus": "assigned", "ticketSubStatus": "Unanswered", "priority": "Critical" },
{ "ticketSource": "instagram", "ticketId": "e0fc25d9-d53d-4bba-a076-9fe3fd4c62ac", "customerName": "Athene Skalls", "createdDate": "18/08/2023", "ticketStatus": "assigned", "ticketSubStatus": "Customer Replied", "priority": "Critical" },
{ "ticketSource": "Facebook", "ticketId": "a0609aeb-c505-4643-bed5-e621b1a49e36", "customerName": "Natassia Saintsbury", "createdDate": "22/07/2023", "ticketStatus": "unassigned", "ticketSubStatus": "Unanswered", "priority": "Low" },
{ "ticketSource": "instagram", "ticketId": "6c01390b-b371-4340-a52f-6cd00b3acb6e", "customerName": "Minnnie Crammy", "createdDate": "20/09/2023", "ticketStatus": "assigned", "ticketSubStatus": "Unanswered", "priority": "Critical" },
{ "ticketSource": "instagram", "ticketId": "84c92478-fc21-4346-a4b6-5dcd749d7379", "customerName": "Arel Hayne", "createdDate": "12/11/2022", "ticketStatus": "unassigned", "ticketSubStatus": "Unanswered", "priority": "High" },
{ "ticketSource": "whatsapp", "ticketId": "8340d0d2-7514-4d28-8a5b-fde956e4c17c", "customerName": "Geneva Diamond", "createdDate": "04/05/2023", "ticketStatus": "unassigned", "ticketSubStatus": "Customer Replied", "priority": "High" },
{ "ticketSource": "instagram", "ticketId": "b5706092-848f-48c6-a266-086844f4adfd", "customerName": "Lloyd Train", "createdDate": "31/12/2022", "ticketStatus": "assigned", "ticketSubStatus": "Unattended", "priority": "Low" },
{ "ticketSource": "SMS", "ticketId": "6fb6641a-6a7e-4248-88dd-b0eed5a43095", "customerName": "Thornie Helks", "createdDate": "22/11/2022", "ticketStatus": "unassigned", "ticketSubStatus": "Customer Replied", "priority": "Medium" }]

export const useGetUnassignedTickets = () => {
    const [isLoading, setLoading] = React.useState<boolean | undefined>(false);
    const [data, setData] = React.useState<ITicketDetails[]>([]);

    const getData = async () => {
        return new Promise<ITicketDetails[]>((res) => {
            setTimeout(() => {
                res(hardcodedData)
            }, 3000)
        })
    }

    React.useEffect(() => {
        setLoading(true);
        getData()
            .then((res) => {
                setData(res);
                setLoading(false);
            });
    }, []);

    return { isLoading, data };
}