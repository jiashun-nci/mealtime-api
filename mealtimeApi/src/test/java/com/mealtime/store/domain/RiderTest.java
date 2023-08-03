package com.mealtime.store.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mealtime.store.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class RiderTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Rider.class);
        Rider rider1 = new Rider();
        rider1.setId(1L);
        Rider rider2 = new Rider();
        rider2.setId(rider1.getId());
        assertThat(rider1).isEqualTo(rider2);
        rider2.setId(2L);
        assertThat(rider1).isNotEqualTo(rider2);
        rider1.setId(null);
        assertThat(rider1).isNotEqualTo(rider2);
    }
}
