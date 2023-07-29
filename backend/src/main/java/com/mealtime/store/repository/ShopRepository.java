package com.mealtime.store.repository;

import com.mealtime.store.domain.Shop;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Shop entity.
 */
@Repository
public interface ShopRepository extends JpaRepository<Shop, Long> {
    default Optional<Shop> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Shop> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Shop> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct shop from Shop shop left join fetch shop.user",
        countQuery = "select count(distinct shop) from Shop shop"
    )
    Page<Shop> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct shop from Shop shop left join fetch shop.user")
    List<Shop> findAllWithToOneRelationships();

    @Query("select shop from Shop shop left join fetch shop.user where shop.id =:id")
    Optional<Shop> findOneWithToOneRelationships(@Param("id") Long id);
}
