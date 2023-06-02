package com.mastercard.dxp.entity;





import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import org.springframework.boot.jackson.JsonComponent;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@JsonComponent
public class LocalDateTimeSerializer extends JsonSerializer<LocalDateTime> {

private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("EEE, d MMM yyyy HH:mm:ss");

@Override
public void serialize(LocalDateTime value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
gen.writeString(value.format(formatter));
  

  }
}

 
