<script setup lang="ts">
  import { useRouter } from '#imports';
  import { computed, onMounted, ref } from 'vue';

  import CardDetails from '~/components/card/CardDetails.vue';
  import { useDb } from '~/composables/useDb';

  const { getCardById } = useDb();
  const card = ref();
  const router = useRouter();
  const routeParams = computed(() => router.currentRoute.value.params);

  onMounted(() => {
    const cardSet: string =
      typeof routeParams.value.set === 'string'
        ? routeParams.value.set
        : routeParams.value.set.join('');
    const pathNumber: string = routeParams.value.number[0];
    const cardId = `${cardSet.toUpperCase()}-${pathNumber.toUpperCase()}`;
    card.value = getCardById(cardId, 'en').data;
    if (!card) {
      throw createError({ statusCode: 404, statusMessage: 'Card not found' });
    }
    const sluggedName = card.value.name.toLowerCase().replace(/ /g, '-');
    if (sluggedName !== routeParams.value.number[1]) {
      router.replace(`/card/${cardSet}/${pathNumber}/${sluggedName}`);
    }
  });
</script>

<template>
  <div>
    <CardDetails :card="card" />
  </div>
</template>
