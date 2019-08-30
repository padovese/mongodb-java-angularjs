package com.padovese.crud;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class Wine {

    @Id
    private String id;
    private String name;
    private short year;
    private WineType wineType;

}
