package com.mealtime.store.domain.enumeration;

/**
 * The PaymentMethod enumeration.
 */
public enum PaymentMethod {
    CREDIT_CARD("card"),
    CASH("cash");

    private final String value;

    PaymentMethod(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
