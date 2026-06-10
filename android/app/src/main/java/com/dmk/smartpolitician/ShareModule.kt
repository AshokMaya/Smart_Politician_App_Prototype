package com.dmk.smartpolitician

import android.R
import android.content.Intent
import android.content.pm.ResolveInfo
import androidx.core.content.ContextCompat.startActivity
import com.facebook.react.bridge.*
import java.util.*


class ShareModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "AndroidShare"
    }

    @ReactMethod
    fun share(data: ReadableMap, promise: Promise) {
        try {
            val url = if (data.hasKey("url")) data.getString("url") else ""
            val appId = if (data.hasKey("appId")) data.getString("appId") else ""

            if (appId == "") {
                promise.reject("missing options", "appId is required")
                return
            }

            if (url == "") {
                promise.reject("missing options", "url is required")
                return
            }

            val appIntent = Intent(Intent.ACTION_SEND)
            appIntent.setType("text/plain")
            appIntent.putExtra(Intent.EXTRA_TEXT, url)

            var isAppFound = false
            val intentActivities: List<ResolveInfo> = reactApplicationContext.packageManager
                .queryIntentActivities(appIntent, 0)

            for (intentActivitiy in intentActivities) {
                if (intentActivitiy.activityInfo.packageName.lowercase(Locale.getDefault()).startsWith(
                        appId.toString(),
                    )
                ) {
                    appIntent.setPackage(intentActivitiy.activityInfo.packageName)
                    appIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                    isAppFound = true
                    break
                }
            }

            if (isAppFound) {
                startActivity(reactApplicationContext, appIntent, null)
                promise.resolve("successfully launched the app")
            } else {
                promise.reject("App not found", "app is not installed in your mobile")
            }
        } catch (e: Throwable) {
            promise.reject("Error:: ", e)
        }
    }
}
