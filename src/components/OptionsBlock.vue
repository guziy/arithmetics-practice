<script setup lang="ts">
    import { reactive } from 'vue'
    import { useI18n } from 'vue-i18n';
    import { BForm } from 'bootstrap-vue-next';

    const {t} = useI18n();

    const onStart = (event: Event) => {
        event.preventDefault()
        console.log(event)
    }


    const user = reactive({
        name: ''
    })

</script>



<template>
    <BContainer class="mt-5">
        <BForm>
            <BFormGroup
                id="input-group-name"
                :label="t('pls_enter_your_name').concat(':')"
                label-for="input-name"
                label-cols="6"
            >
            <BFormInput
                id="input-name"
                v-model="user.name"
                required
            ></BFormInput>

            </BFormGroup>
        </BForm>

        <BRow>
            <BCol>
                {{ t('hello') }}, <span :style="{fontWeight: 'bold'}">{{ user.name }}</span>, {{ t('lets_do_few_exercises') }}
            </BCol>
        </BRow>
    </BContainer>
</template>

