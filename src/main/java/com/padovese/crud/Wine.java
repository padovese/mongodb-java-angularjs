package com.padovese.crud;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document
public class Wine {

    @Id
    public String id;

    public String name;
    public short year;
    public WineType wineType;

    public Wine() {}

    public Wine(String name, short year, WineType wineType) {
        this.name = name;
        this.year = year;
        this.wineType = wineType;
    }

	public String getName() {
		return name;
	}
    
    
}
