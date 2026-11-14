<script setup lang="ts">
    import { reactive, computed } from 'vue'
    import { useI18n } from 'vue-i18n'
    import { required, minValue, maxValue, integer, helpers } from '@vuelidate/validators'
    import useVuelidate from '@vuelidate/core'
    import {
        DEFAULT_NUM_EQUATIONS,
        initially_selected_operations,
        MAX_NUM_EQUATIONS,
        MIN_NUM_EQUATIONS,
        num_upper_limit_list
    } from '../util/constants'
    import { get_operations } from '../util/operations'

    const { t } = useI18n()

    const equation_options = reactive({
        numberOfEquations: DEFAULT_NUM_EQUATIONS,
        operations: get_operations(),
        active_operation_ids: initially_selected_operations,
        current_num_max: num_upper_limit_list[0],
        user: {
            name: 'Guest'
        }
    })

    const exerciseCountMessage = () =>
        `${t('number_of_exercises_should_be')} ${MIN_NUM_EQUATIONS} ${t('and')} ${MAX_NUM_EQUATIONS}`

    const validations = computed(() => ({
        numberOfEquations: {
            required,
            integer: helpers.withMessage(() => t('integer_is_required'), integer),
            min: helpers.withMessage(exerciseCountMessage, minValue(MIN_NUM_EQUATIONS)),
            max: helpers.withMessage(exerciseCountMessage, maxValue(MAX_NUM_EQUATIONS))
        },
        active_operation_ids: {
            required: helpers.withMessage(
                () => t('you_need_to_select_at_least_one_operation'),
                required
            )
        }
    }))

    const v$ = useVuelidate(validations, equation_options)

    const fieldMessage = (field: { $error: boolean; $errors: { $message: unknown }[] }) => {
        if (!field.$error || field.$errors.length === 0) return ''
        return String(field.$errors[0].$message ?? '')
    }

    const onStart = async () => {
        const valid = await v$.value.$validate()
        if (!valid) return
    }
</script>

<template>
  <section class="setup">
    <p class="greeting">{{ t('hello') }}</p>

    <el-form label-position="top" @submit.prevent="onStart">
      <el-form-item :label="t('pls_enter_your_name')">
        <el-input
          id="user-name-input"
          v-model="equation_options.user.name"
        />
      </el-form-item>

      <el-form-item
        :label="t('lets_do_few_exercises')"
        :error="fieldMessage(v$.numberOfEquations)"
      >
        <el-input-number
          id="input-num-exercises"
          v-model="equation_options.numberOfEquations"
          :min="MIN_NUM_EQUATIONS"
          :max="MAX_NUM_EQUATIONS"
          @change="v$.numberOfEquations.$touch()"
        />
      </el-form-item>

      <el-form-item
        :label="t('choose_operations')"
        :error="fieldMessage(v$.active_operation_ids)"
      >
        <el-checkbox-group
          v-model="equation_options.active_operation_ids"
          class="operations"
          @change="v$.active_operation_ids.$touch()"
        >
          <el-checkbox
            v-for="op in equation_options.operations"
            :key="op.id"
            :value="op.id"
          >
            {{ t(op.label) }} ({{ op.symbol }})
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item :label="t('i_can_compute_numbers_up_to')">
        <el-select v-model="equation_options.current_num_max" class="limit-select">
          <el-option
            v-for="alimit in num_upper_limit_list"
            :key="alimit"
            :label="alimit"
            :value="alimit"
          />
        </el-select>
      </el-form-item>

      <el-button type="primary" native-type="submit" class="start-button">
        {{ t('yes_lets_start') }}
      </el-button>
    </el-form>
  </section>
</template>

<style scoped>
.setup {
  width: min(480px, 100%);
  margin: 0 auto;
  padding: 28px 28px 24px;
  background: #fff;
  color: #1f2933;
  border-radius: 12px;
  text-align: left;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.28);
}

.greeting {
  margin: 0 0 18px;
  font-size: 1.4rem;
  font-weight: 600;
}

.operations {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
}

.limit-select {
  width: 140px;
}

.start-button {
  width: 100%;
  margin-top: 8px;
}

#input-num-exercises {
  width: 160px;
}

@media (max-width: 480px) {
  .setup {
    padding: 20px 16px 16px;
  }

  .operations {
    grid-template-columns: 1fr;
  }
}
</style>
