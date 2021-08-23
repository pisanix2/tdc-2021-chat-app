CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

create table public.tdc_contact (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	title varchar(80) not null,
	
	"createdAt" timestamp NOT NULL DEFAULT now(),
	"updatedAt" timestamp NULL,
	"deletedAt" timestamp NULL,
	CONSTRAINT pk_tdc_contact PRIMARY KEY (id)
);

create table public.tdc_contact_joined (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	id_contact_origin uuid NOT NULL,
	id_contact_destination uuid NOT NULL,
	
	"createdAt" timestamp NOT NULL DEFAULT now(),
	"updatedAt" timestamp NULL,
	"deletedAt" timestamp NULL,
	CONSTRAINT pk_tdc_contact_joined PRIMARY KEY (id),
	constraint fk_joinned_contactorigin foreign key (id_contact_origin) references tdc_contact(id),
	constraint fk_joinned_contactdest foreign key (id_contact_destination) references tdc_contact(id)
);

create table public.tdc_message (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	id_contact_origin uuid NOT NULL,
	id_contact_destination uuid NOT NULL,
	"content" varchar(280) not null,
	
	"createdAt" timestamp NOT NULL DEFAULT now(),
	"updatedAt" timestamp NULL,
	"deletedAt" timestamp NULL,
	CONSTRAINT pk_tdc_message PRIMARY KEY (id),
	constraint fk_message_contactorigin foreign key (id_contact_origin) references tdc_contact(id),
	constraint fk_message_contactdest foreign key (id_contact_destination) references tdc_contact(id)
);
