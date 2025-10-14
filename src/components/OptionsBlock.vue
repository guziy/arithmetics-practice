<script setup lang="ts">
    import { reactive } from 'vue'
    import { useI18n } from 'vue-i18n';
    import { BForm } from 'bootstrap-vue-next';
    import {DEFAULT_NUM_EQUATIONS} from '../util/constants'

    const {t} = useI18n();

    const onStart = (event: Event) => {
        event.preventDefault();
        console.log(event);
    }

    const onChange = (event: Event) => {
        console.log(equation_options);
    }


    const user = reactive({
        name: ''
    })

    const equation_options = reactive({
        numberOfEquations: DEFAULT_NUM_EQUATIONS
    })

</script>



<template>
    <BContainer class="mt-5">
        <BForm d-flex  flex-row>
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

            <BFormGroup class="mt-5">
                <BRow>
                    <BCol>
                        {{ t('hello') }}, 
                        <span :style="{fontWeight: 'bold'}">{{ user.name }}</span>, 
                        {{ t('lets_do_few') }} 
                        <BFormInput id="input-num-exercises" 
                            v-model="equation_options.numberOfEquations"
                            type="number"
                            @change="onChange($event)" 
                            class="col-lg-1">
                        </BFormInput> 
                        {{ t('exercises') }}.
                    </BCol>
                </BRow>
            </BFormGroup>

        </BForm>

</BContainer>
</template>

