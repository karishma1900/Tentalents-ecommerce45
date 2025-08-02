
/**
 * IMPORTANT: Do not modify this file.
 * This file allows the app to run without bundling in workspace libraries.
 * Must be contained in the ".nx" folder inside the output path.
 */
const Module = require('module');
const path = require('path');
const fs = require('fs');
const originalResolveFilename = Module._resolveFilename;
const distPath = __dirname;
const manifest = [{"module":"@shared/auth","exactMatch":"libs/shared/auth/src/index.js","pattern":"libs/shared/auth/src/index.ts"},{"module":"@shared/config","exactMatch":"libs/shared/config/src/index.js","pattern":"libs/shared/config/src/index.ts"},{"module":"@shared/constants","exactMatch":"libs/shared/constants/src/index.js","pattern":"libs/shared/constants/src/index.ts"},{"module":"@shared/error","exactMatch":"libs/shared/error/src/index.js","pattern":"libs/shared/error/src/index.ts"},{"module":"@shared/kafka","exactMatch":"libs/shared/kafka/src/index.js","pattern":"libs/shared/kafka/src/index.ts"},{"module":"@shared/logger","exactMatch":"libs/shared/logger/src/index.js","pattern":"libs/shared/logger/src/index.ts"},{"module":"@shared/middlewares","exactMatch":"libs/shared/middlewares/src/index.js","pattern":"libs/shared/middlewares/src/index.ts"},{"module":"@shared/redis","exactMatch":"libs/shared/redis/src/index.js","pattern":"libs/shared/redis/src/index.ts"},{"module":"@shared/minio","exactMatch":"libs/shared/minio/src/index.js","pattern":"libs/shared/minio/src/index.ts"},{"module":"@shared/email","exactMatch":"libs/shared/email/src/index.js","pattern":"libs/shared/email/src/index.ts"},{"module":"@shared/swagger","exactMatch":"libs/shared/swagger/src/index.js","pattern":"libs/shared/swagger/src/index.ts"},{"module":"@shared/types","exactMatch":"libs/shared/types/src/index.js","pattern":"libs/shared/types/src/index.ts"},{"module":"@shared/utils","exactMatch":"libs/shared/utils/src/index.js","pattern":"libs/shared/utils/src/index.ts"}];

Module._resolveFilename = function(request, parent) {
  let found;
  for (const entry of manifest) {
    if (request === entry.module && entry.exactMatch) {
      const entry = manifest.find((x) => request === x.module || request.startsWith(x.module + "/"));
      const candidate = path.join(distPath, entry.exactMatch);
      if (isFile(candidate)) {
        found = candidate;
        break;
      }
    } else {
      const re = new RegExp(entry.module.replace(/\*$/, "(?<rest>.*)"));
      const match = request.match(re);

      if (match?.groups) {
        const candidate = path.join(distPath, entry.pattern.replace("*", ""), match.groups.rest);
        if (isFile(candidate)) {
          found = candidate;
        }
      }

    }
  }
  if (found) {
    const modifiedArguments = [found, ...[].slice.call(arguments, 1)];
    return originalResolveFilename.apply(this, modifiedArguments);
  } else {
    return originalResolveFilename.apply(this, arguments);
  }
};

function isFile(s) {
  try {
    require.resolve(s);
    return true;
  } catch (_e) {
    return false;
  }
}

// Call the user-defined main.
module.exports = require('./apps/backend/post-mvp-services/recommendation-service/src/main.js');
