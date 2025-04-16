package com.kodofitness

import android.content.Context
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.fitness.Fitness
import com.google.android.gms.fitness.data.DataType
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.util.concurrent.TimeUnit

class StepsService(private val context: Context) {
    suspend fun getDailySteps(): Int = withContext(Dispatchers.IO) {
        try {
            val account = GoogleSignIn.getLastSignedInAccount(context) ?: return@withContext 0
            val result = Fitness.getHistoryClient(context, account)
                .readDailyTotal(DataType.TYPE_STEP_COUNT_DELTA)
                .await()
            result.getDataSet(DataType.TYPE_STEP_COUNT_DELTA)
                ?.dataPoints
                ?.firstOrNull()
                ?.getValue(com.google.android.gms.fitness.data.Field.FIELD_STEPS)
                ?.asInt() ?: 0
        } catch (e: Exception) {
            0
        }
    }
}
